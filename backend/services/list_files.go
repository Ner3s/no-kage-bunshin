package services

import (
	"no-kage-bunshin/backend/models"
	"no-kage-bunshin/backend/utils"
	"os"
	"path/filepath"
	"time"
)

func ListFiles(folderPath string) ([]models.FileInfo, error) {
	var files []models.FileInfo

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

		files = append(files, models.FileInfo{
			Path:          path,
			IsDir:         d.IsDir(),
			FolderPath:    filepath.Dir(path),
			Filename:      filepath.Base(path),
			Size:          size,
			HumanSize:     utils.FormatSize(size),
			FileExtension: filepath.Ext(path),
			CreatedAt:     info.ModTime().Format(time.RFC3339),
			Selected:      false,
		})

		return nil
	})

	return files, err
}
