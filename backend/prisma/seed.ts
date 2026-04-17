import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function seedRoles() {
  await prisma.role.upsert({
    where: { name: 'Student' },
    update: {},
    create: { name: 'Student' }
  });

  await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' }
  });
}

async function seedAdmin() {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  if (!email || !password) return;

  const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: 'Admin' } });

  await prisma.user.upsert({
    where: { email },
    update: {
      roles: { connect: { id: adminRole.id } }
    },
    create: {
      email,
      displayName: 'Noesis Admin',
      passwordHash: await bcrypt.hash(password, 12),
      roles: { connect: { id: adminRole.id } }
    }
  });
}

async function seedSubject(input: {
  name: string;
  slug: string;
  description: string;
  order: number;
  topics: Array<{
    name: string;
    slug: string;
    description: string;
    order: number;
    concepts: Array<{ name: string; slug: string; description: string; order: number }>;
  }>;
  prerequisites: Array<[string, string]>;
}) {
  const subject = await prisma.subject.upsert({
    where: { slug: input.slug },
    update: { name: input.name, description: input.description, order: input.order },
    create: { name: input.name, slug: input.slug, description: input.description, order: input.order }
  });

  const conceptIds = new Map<string, string>();

  for (const topicInput of input.topics) {
    const topic = await prisma.topic.upsert({
      where: { slug: topicInput.slug },
      update: {
        subjectId: subject.id,
        name: topicInput.name,
        description: topicInput.description,
        order: topicInput.order
      },
      create: {
        subjectId: subject.id,
        name: topicInput.name,
        slug: topicInput.slug,
        description: topicInput.description,
        order: topicInput.order
      }
    });

    for (const conceptInput of topicInput.concepts) {
      const concept = await prisma.concept.upsert({
        where: { slug: conceptInput.slug },
        update: {
          topicId: topic.id,
          name: conceptInput.name,
          description: conceptInput.description,
          order: conceptInput.order
        },
        create: {
          topicId: topic.id,
          name: conceptInput.name,
          slug: conceptInput.slug,
          description: conceptInput.description,
          order: conceptInput.order
        }
      });
      conceptIds.set(conceptInput.slug, concept.id);
    }
  }

  for (const [conceptSlug, prerequisiteSlug] of input.prerequisites) {
    const conceptId = conceptIds.get(conceptSlug);
    const prerequisiteConceptId = conceptIds.get(prerequisiteSlug);
    if (!conceptId || !prerequisiteConceptId) continue;

    await prisma.prerequisiteRelation.upsert({
      where: { conceptId_prerequisiteConceptId: { conceptId, prerequisiteConceptId } },
      update: {},
      create: { conceptId, prerequisiteConceptId }
    });
  }
}

async function main() {
  await seedRoles();
  await seedAdmin();

  await seedSubject({
    name: 'Object-Oriented Programming',
    slug: 'object-oriented-programming',
    description: 'Core OOP principles for designing modular software.',
    order: 1,
    topics: [
      {
        name: 'Classes and Objects',
        slug: 'oop-classes-and-objects',
        description: 'Blueprints, instances, attributes, and methods.',
        order: 1,
        concepts: [
          { name: 'Class', slug: 'oop-class', description: 'A template that defines data and behavior.', order: 1 },
          { name: 'Object', slug: 'oop-object', description: 'A runtime instance of a class.', order: 2 },
          {
            name: 'Constructor',
            slug: 'oop-constructor',
            description: 'Initialization logic for new objects.',
            order: 3
          }
        ]
      },
      {
        name: 'Encapsulation',
        slug: 'oop-encapsulation',
        description: 'Bundling state and behavior behind controlled access.',
        order: 2,
        concepts: [
          {
            name: 'Access Modifiers',
            slug: 'oop-access-modifiers',
            description: 'Public, private, and protected access boundaries.',
            order: 1
          },
          {
            name: 'Getters and Setters',
            slug: 'oop-getters-setters',
            description: 'Controlled access to internal state.',
            order: 2
          }
        ]
      },
      {
        name: 'Inheritance',
        slug: 'oop-inheritance',
        description: 'Reusing behavior through parent-child relationships.',
        order: 3,
        concepts: [
          {
            name: 'Base Class',
            slug: 'oop-base-class',
            description: 'A parent abstraction that shares common behavior.',
            order: 1
          },
          {
            name: 'Subclass',
            slug: 'oop-subclass',
            description: 'A specialized class derived from a base class.',
            order: 2
          }
        ]
      },
      {
        name: 'Polymorphism',
        slug: 'oop-polymorphism',
        description: 'Using shared interfaces for different implementations.',
        order: 4,
        concepts: [
          {
            name: 'Method Overriding',
            slug: 'oop-method-overriding',
            description: 'Subclass-specific behavior for inherited methods.',
            order: 1
          },
          {
            name: 'Interface Dispatch',
            slug: 'oop-interface-dispatch',
            description: 'Calling behavior through a shared contract.',
            order: 2
          }
        ]
      },
      {
        name: 'Abstraction',
        slug: 'oop-abstraction',
        description: 'Representing essential behavior while hiding details.',
        order: 5,
        concepts: [
          {
            name: 'Abstract Class',
            slug: 'oop-abstract-class',
            description: 'A partially implemented class meant for extension.',
            order: 1
          },
          {
            name: 'Interface',
            slug: 'oop-interface',
            description: 'A behavioral contract without implementation details.',
            order: 2
          }
        ]
      }
    ],
    prerequisites: [
      ['oop-object', 'oop-class'],
      ['oop-constructor', 'oop-class'],
      ['oop-access-modifiers', 'oop-class'],
      ['oop-subclass', 'oop-base-class'],
      ['oop-method-overriding', 'oop-subclass'],
      ['oop-interface-dispatch', 'oop-interface'],
      ['oop-abstract-class', 'oop-class'],
      ['oop-interface', 'oop-class']
    ]
  });

  await seedSubject({
    name: 'Data Structures',
    slug: 'data-structures',
    description: 'Foundational structures for organizing and accessing data efficiently.',
    order: 2,
    topics: [
      {
        name: 'Arrays',
        slug: 'ds-arrays',
        description: 'Contiguous indexed collections.',
        order: 1,
        concepts: [
          { name: 'Indexing', slug: 'ds-array-indexing', description: 'Accessing elements by position.', order: 1 },
          { name: 'Traversal', slug: 'ds-array-traversal', description: 'Visiting each element in sequence.', order: 2 }
        ]
      },
      {
        name: 'Linked Lists',
        slug: 'ds-linked-lists',
        description: 'Node-based linear collections.',
        order: 2,
        concepts: [
          { name: 'Node', slug: 'ds-list-node', description: 'A value plus reference to another node.', order: 1 },
          {
            name: 'Pointer Updates',
            slug: 'ds-pointer-updates',
            description: 'Changing references during insert/delete.',
            order: 2
          }
        ]
      },
      {
        name: 'Stacks',
        slug: 'ds-stacks',
        description: 'Last-in, first-out collections.',
        order: 3,
        concepts: [
          {
            name: 'Push and Pop',
            slug: 'ds-stack-push-pop',
            description: 'Adding and removing from the top.',
            order: 1
          }
        ]
      },
      {
        name: 'Queues',
        slug: 'ds-queues',
        description: 'First-in, first-out collections.',
        order: 4,
        concepts: [
          {
            name: 'Enqueue and Dequeue',
            slug: 'ds-queue-enqueue-dequeue',
            description: 'Adding to back and removing from front.',
            order: 1
          }
        ]
      },
      {
        name: 'Trees',
        slug: 'ds-trees',
        description: 'Hierarchical node structures.',
        order: 5,
        concepts: [
          {
            name: 'Binary Tree',
            slug: 'ds-binary-tree',
            description: 'A tree where each node has at most two children.',
            order: 1
          },
          {
            name: 'Tree Traversal',
            slug: 'ds-tree-traversal',
            description: 'Preorder, inorder, postorder, and level-order traversal.',
            order: 2
          }
        ]
      },
      {
        name: 'Graphs',
        slug: 'ds-graphs',
        description: 'Vertices connected by edges.',
        order: 6,
        concepts: [
          {
            name: 'Adjacency List',
            slug: 'ds-adjacency-list',
            description: 'Graph representation using neighbor lists.',
            order: 1
          },
          { name: 'Breadth-First Search', slug: 'ds-bfs', description: 'Layer-by-layer graph traversal.', order: 2 }
        ]
      },
      {
        name: 'Hash Tables',
        slug: 'ds-hash-tables',
        description: 'Key-value storage based on hash functions.',
        order: 7,
        concepts: [
          { name: 'Hash Function', slug: 'ds-hash-function', description: 'Mapping keys to bucket indexes.', order: 1 },
          {
            name: 'Collision Handling',
            slug: 'ds-collision-handling',
            description: 'Resolving multiple keys mapping to one bucket.',
            order: 2
          }
        ]
      }
    ],
    prerequisites: [
      ['ds-array-traversal', 'ds-array-indexing'],
      ['ds-pointer-updates', 'ds-list-node'],
      ['ds-stack-push-pop', 'ds-array-traversal'],
      ['ds-queue-enqueue-dequeue', 'ds-array-traversal'],
      ['ds-tree-traversal', 'ds-binary-tree'],
      ['ds-bfs', 'ds-adjacency-list'],
      ['ds-collision-handling', 'ds-hash-function']
    ]
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
