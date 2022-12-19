import { Visual } from "./visual";

export class CharacterWrapper {
	private visual: Visual = new Visual();

	public update(position: Vector3, flatRotation: CFrame): void {
		this.visual.update(new CFrame(position).mul(flatRotation));
	}

	public destroy = () => this.visual.destroy();
}
