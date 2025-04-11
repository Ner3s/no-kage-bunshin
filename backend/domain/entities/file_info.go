package entities

type FileInfo struct {
	Path          string `json:"path"`
	IsDir         bool   `json:"isDir"`
	FolderPath    string `json:"folderPath"`
	Filename      string `json:"filename"`
	Size          int64  `json:"size"`
	HumanSize     string `json:"humanSize"`
	FileExtension string `json:"fileExtension"`
	CreatedAt     string `json:"createdAt"`
	Selected      bool   `json:"selected"`
}