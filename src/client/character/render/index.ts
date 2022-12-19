import { CameraWrapper } from "./camera";
import { CharacterWrapper } from "./character";
import { RunService, Workspace } from "@rbxts/services";
import { PreRender } from "../prerender";

export class Render {
	private readonly _camera: CameraWrapper = new CameraWrapper(Workspace.CurrentCamera!);
	private readonly _character: CharacterWrapper = new CharacterWrapper();
	private readonly _connection: RBXScriptConnection;

	constructor(private readonly _preRender: PreRender) {
		this._connection = RunService.RenderStepped.Connect(this.update);
	}

	private update(_: number): void {
		const position = this._preRender.position();
		const rotation = this._preRender.rotation();
		const breatheOffset = this._preRender.breatheOffset();
		this._camera.update(position.add(breatheOffset), rotation);
		this._character.update(position, rotation);
	}

	public destroy(): void {
		this._connection.Disconnect();
	}
}
