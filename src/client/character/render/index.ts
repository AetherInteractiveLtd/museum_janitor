import { CameraWrapper } from "./camera";
import { CharacterWrapper } from "./character";
import { RunService, Workspace } from "@rbxts/services";
import { PreRender } from "../prerender";

export class Render {
	private readonly _camera: CameraWrapper = new CameraWrapper(Workspace.CurrentCamera!);
	private readonly _character: CharacterWrapper = new CharacterWrapper();
	private readonly _connection: RBXScriptConnection;

	constructor(private readonly _preRender: PreRender) {
		this._connection = RunService.RenderStepped.Connect((_: number) => this.update());
	}

	private update(): void {
		const position = this._preRender.position();
		const breatheOffset = this._preRender.breatheOffset();
		this._camera.update(position.add(breatheOffset), this._preRender.rotation());
		this._character.update(position, this._preRender.flatRotation());
	}

	public destroy(): void {
		this._connection.Disconnect();
	}
}
