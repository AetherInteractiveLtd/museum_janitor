import { CameraWrapper } from "./camera";
import { CharacterWrapper } from "./character";
import { RunService, Workspace } from "@rbxts/services";
import { PreRender } from "../prerender";

class Render {
	private readonly _camera: CameraWrapper = new CameraWrapper(Workspace.CurrentCamera!);
	private readonly _character: CharacterWrapper = new CharacterWrapper();
	private readonly _connection: RBXScriptConnection;

	constructor(private readonly _preRender: PreRender) {
		this._connection = RunService.RenderStepped.Connect(() => {
			this._camera.update(this._preRender.position(), this._preRender.rotation());
			this._character.update(
				this._preRender.breatheOffset().add(this._preRender.position()),
				this._preRender.rotation(),
			);
		});
	}

	public destroy(): void {
		this._preRender.destroy();
		this._connection.Disconnect();
	}
}
