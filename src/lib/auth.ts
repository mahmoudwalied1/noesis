import type { NavigateFunction } from 'react-router-dom';

export function logout(navigate: NavigateFunction) {
  localStorage.clear();
  sessionStorage.clear();
  navigate('/');
}
