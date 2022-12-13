declare class Spring {
    public position: Vector3;
    public velocity: Vector3;
    public target: Vector3;

    constructor(position: Vector3, velocity: Vector3, target: Vector3);
    
    update(dt: number): Vector3;
}

export = Spring;