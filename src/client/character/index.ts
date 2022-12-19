import { PreRender } from "./prerender";
import { Render } from "./render";

export class Character {
	private readonly _render: Render;

	constructor() {
		const preRender = new PreRender();
		this._render = new Render(preRender);
	}

	public destroy(): void {
		this._render.destroy();
	}
}
