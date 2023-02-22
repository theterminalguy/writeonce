
import axios from 'axios';


const baseInstallUrl = "http://localhost:3000/api/v1/pipe/install/";

interface BuildPipeFace {
    getPipeName(): string;
    getRequireAuth(): boolean;
    getGoogleAuth(): boolean | undefined;
    getOtherAuth(): boolean | undefined;
    getJsonForm(): object;
    // pipeName: string;
    // requireAuth: boolean
    // googleAuth: boolean | undefined
    // otherAuth: boolean | undefined
    // jsonForm: object

}

export default class PipeModel {
    private pipeName: string;
    private requireAuth: boolean
    private googleAuth: boolean | undefined
    private otherAuth: boolean | undefined
    private jsonForm: object

    constructor(pipeBuilder: BuildPipeFace) {
        this.pipeName = pipeBuilder.getPipeName();
        this.requireAuth = pipeBuilder.getRequireAuth();
        this.googleAuth = pipeBuilder.getGoogleAuth();
        this.otherAuth = pipeBuilder.getOtherAuth();
        this.jsonForm = pipeBuilder.getJsonForm();
    }

    setReview(review: string, user: object) {
        // post review to server
    }
    getReview(user: object) {
        // get review to server
    }

    uninstall(user: object) {
        // delete pipe for user
    }


}


export class BuildPipe {
    private pipeName: string;
    private requireAuth: boolean
    private googleAuth: boolean | undefined
    private otherAuth: boolean | undefined
    private jsonForm: object

    constructor(pipeName: string, requireAuth: boolean, jsonForm: object){
        // do nothing
        this.pipeName = pipeName;
        this.requireAuth = requireAuth;
        this.jsonForm = jsonForm;
    }

    setPipeName(pipeName: string) {
        this.pipeName = pipeName;
        return this;
    }
    setRequireAuth(requireAuth: boolean) {
        this.requireAuth = requireAuth;
        return this;
    }
    setGoogleAuth(googleAuth: boolean) {
        this.googleAuth = googleAuth;
        return this;
    }
    setOtherAuth(otherAuth: boolean) {
        this.otherAuth = otherAuth;
        return this;
    }
    setJsonForm(jsonForm: object) {
        this.jsonForm = jsonForm;
        return this;
    }

    build(): PipeModel {
        return new PipeModel(this);
    }

    getPipeName(): string {
        return this.pipeName;
    }

    getRequireAuth(): boolean {
        return this.requireAuth;
    }

    getGoogleAuth(): boolean | undefined {
        return this.googleAuth;
    }

    getOtherAuth(): boolean | undefined {
        return this.otherAuth;
    }

    getJsonForm(): object {
        return this.jsonForm;
    }
}

export async function sourcePipe(pipeAlias: string) {
    try{
        const response = await axios.get(baseInstallUrl + pipeAlias);
        const pipeInfo = response.data.json;
        const newPipeInstall = new BuildPipe(pipeInfo.pipeName, pipeInfo.requireAuth, pipeInfo.jsonForm)
        const pipeIns = newPipeInstall
            .setGoogleAuth(pipeInfo.googleAuth)
            .setOtherAuth(pipeInfo.otherAuth)
            .build()
        return {message: "Install Successfully", status: true, pipe: pipeIns}
    } catch (error) {
        return {message: error, status: false}
    }
}
