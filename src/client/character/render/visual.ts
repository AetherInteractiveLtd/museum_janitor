import { Workspace } from "@rbxts/services";

const CHARACTER_FOLDER_NAME = "Characters";
const CHARACTER_NAME = "Character";

const CHARACTER_FOLDER = new Instance("Folder");
CHARACTER_FOLDER.Name = CHARACTER_FOLDER_NAME;
CHARACTER_FOLDER.Parent = Workspace;

export class Visual {
	private readonly _model: Model;

	constructor() {
		const model = new Instance("Model");
		const torso = new Instance("Part");

		torso.Name = "Torso";
		torso.Size = new Vector3(3, 3, 3);
		torso.Anchored = true;
		torso.CanCollide = false;
		torso.Transparency = 0.5;
		torso.Color = Color3.fromRGB(255, 0, 0);
		torso.Parent = model;

		model.Name = CHARACTER_NAME;
		model.Parent = CHARACTER_FOLDER;
		this._model = model;
	}

	public update(cframe: CFrame) {
		this._model.PivotTo(cframe);
	}

	public destroy(): void {
		this._model.Destroy();
	}
}
