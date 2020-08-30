let incrementalId = 0;

export abstract class Entity {
  public id: number;

  constructor() {
    this.id = incrementalId++;
  }
}
