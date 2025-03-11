package services

import (
	"no-kage-bunshin/backend/utils"
	"os"
	"path/filepath"
)

type FileInfo struct {
	Path       string `json:"path"`
	IsDir      bool   `json:"isDir"`
	FolderPath string `json:"folderPath"`
	Filename   string `json:"filename"`
	Size       int64  `json:"size"`
	SizeHuman  string `json:"sizeHuman"`
}

func ListFiles(folderPath string) ([]FileInfo, error) {
	var files []FileInfo

	err := filepath.WalkDir(folderPath, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}

		info, errInf := d.Info()
		if errInf != nil {
			return errInf
		}

		size := int64(0)
		if !d.IsDir() {
			size = info.Size()
		}

		files = append(files, FileInfo{
			Path:       path,
			IsDir:      d.IsDir(),
			FolderPath: filepath.Dir(path),
			Filename:   filepath.Base(path),
			Size:       size,
			SizeHuman:  utils.FormatSize(size),
		})

		return nil
	})

	return files, err
}
