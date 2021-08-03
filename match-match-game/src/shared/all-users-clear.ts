import { allUsers } from './user';

export function clearUsers(): void {
  let maxIndex = 0;
  allUsers.forEach((item, index) => {
    if (allUsers[index + 1] !== undefined && item.score <= allUsers[index + 1].score) {
      maxIndex = index + 1;
    }
  });

  for (let i = 0; i < allUsers.length; i++) {
    if (i < maxIndex) {
      allUsers.pop();
      maxIndex--;
    }
  }
}
