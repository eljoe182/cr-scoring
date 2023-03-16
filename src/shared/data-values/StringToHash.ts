export default class StringToHash {
  static hash(str: string): string {
    let hash = 0;
    if (str.length == 0) {
      return hash.toString();
    }
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash = hash & hash;
    }
    return hash.toString();
  }
}
