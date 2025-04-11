export namespace entities {
	
	export class FileInfo {
	    path: string;
	    isDir: boolean;
	    folderPath: string;
	    filename: string;
	    size: number;
	    humanSize: string;
	    fileExtension: string;
	    createdAt: string;
	    selected: boolean;
	
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
	        this.humanSize = source["humanSize"];
	        this.fileExtension = source["fileExtension"];
	        this.createdAt = source["createdAt"];
	        this.selected = source["selected"];
	    }
	}
	export class DuplicateFile {
	    hash: string;
	    original: FileInfo;
	    duplicates: FileInfo[];
	
	    static createFrom(source: any = {}) {
	        return new DuplicateFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hash = source["hash"];
	        this.original = this.convertValues(source["original"], FileInfo);
	        this.duplicates = this.convertValues(source["duplicates"], FileInfo);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace usecases {
	
	export class CloneResult {
	    clones: entities.DuplicateFile[];
	    extractedDirs: string[];
	    allFiles: entities.FileInfo[];
	
	    static createFrom(source: any = {}) {
	        return new CloneResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.clones = this.convertValues(source["clones"], entities.DuplicateFile);
	        this.extractedDirs = source["extractedDirs"];
	        this.allFiles = this.convertValues(source["allFiles"], entities.FileInfo);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

