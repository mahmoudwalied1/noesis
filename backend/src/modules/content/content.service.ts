import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';

function paging(page: number, pageSize: number) {
  return { skip: (page - 1) * pageSize, take: pageSize };
}

export async function listSubjects(page: number, pageSize: number) {
  const [items, total] = await Promise.all([
    prisma.subject.findMany({ ...paging(page, pageSize), orderBy: { order: 'asc' } }),
    prisma.subject.count()
  ]);
  return { items, page, pageSize, total };
}

export async function getSubject(id: string) {
  const subject = await prisma.subject.findUnique({
    where: { id },
    include: { topics: { orderBy: { order: 'asc' } } }
  });
  if (!subject) throw new AppError(404, 'SUBJECT_NOT_FOUND', 'Subject not found');
  return subject;
}

export const createSubject = (data: Parameters<typeof prisma.subject.create>[0]['data']) =>
  prisma.subject.create({ data });
export const updateSubject = (id: string, data: Parameters<typeof prisma.subject.update>[0]['data']) =>
  prisma.subject.update({ where: { id }, data });
export const deleteSubject = (id: string) => prisma.subject.delete({ where: { id } });

export async function listTopics(subjectId?: string) {
  return prisma.topic.findMany({ where: subjectId ? { subjectId } : undefined, orderBy: { order: 'asc' } });
}

export async function getTopic(id: string) {
  const topic = await prisma.topic.findUnique({ where: { id }, include: { concepts: { orderBy: { order: 'asc' } } } });
  if (!topic) throw new AppError(404, 'TOPIC_NOT_FOUND', 'Topic not found');
  return topic;
}

export const createTopic = (data: Parameters<typeof prisma.topic.create>[0]['data']) => prisma.topic.create({ data });
export const updateTopic = (id: string, data: Parameters<typeof prisma.topic.update>[0]['data']) =>
  prisma.topic.update({ where: { id }, data });
export const deleteTopic = (id: string) => prisma.topic.delete({ where: { id } });

export async function listConcepts(topicId?: string) {
  return prisma.concept.findMany({ where: topicId ? { topicId } : undefined, orderBy: { order: 'asc' } });
}

export async function getConcept(id: string) {
  const concept = await prisma.concept.findUnique({
    where: { id },
    include: { prerequisites: { include: { prerequisiteConcept: true } } }
  });
  if (!concept) throw new AppError(404, 'CONCEPT_NOT_FOUND', 'Concept not found');
  return concept;
}

export const createConcept = (data: Parameters<typeof prisma.concept.create>[0]['data']) =>
  prisma.concept.create({ data });
export const updateConcept = (id: string, data: Parameters<typeof prisma.concept.update>[0]['data']) =>
  prisma.concept.update({ where: { id }, data });
export const deleteConcept = (id: string) => prisma.concept.delete({ where: { id } });

export async function addPrerequisite(conceptId: string, prerequisiteConceptId: string) {
  return prisma.prerequisiteRelation.create({ data: { conceptId, prerequisiteConceptId } });
}

export async function removePrerequisite(conceptId: string, prerequisiteConceptId: string) {
  return prisma.prerequisiteRelation.delete({
    where: { conceptId_prerequisiteConceptId: { conceptId, prerequisiteConceptId } }
  });
}
