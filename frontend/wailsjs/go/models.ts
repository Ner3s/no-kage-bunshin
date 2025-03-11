export namespace services {
	
	export class FileInfo {
	    path: string;
	    isDir: boolean;
	    folderPath: string;
	    filename: string;
	    size: number;
	    sizeHuman: string;
	
	    static createFrom(source: any = {}) {
	        return new FileInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.isDir = source["isDir"];
	        this.folderPath = source["folderPath"];
	        this.filename = source["filename"];
	        this.size = source["size"];
	        this.sizeHuman = source["sizeHuman"];
	    }
	}

}

