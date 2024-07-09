export class Utils {
}
export const popRandomElementFrom = (a, newA) => {
    const indexToPop = Math.floor(Math.random() * a.length);
    const poppedElement = a.splice(indexToPop, 1)[0];
    newA.push(poppedElement);
    return poppedElement;
  };
