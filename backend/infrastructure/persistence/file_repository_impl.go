package persistence

import (
	"fmt"
	"no-kage-bunshin/backend/domain/entities"
	"no-kage-bunshin/backend/domain/services"
	"no-kage-bunshin/backend/infrastructure/utils"
	"os"
	"path/filepath"
	"time"
)

type FileRepositoryImpl struct {
	fileService              services.FileService
	duplicateDetectorService services.DuplicateDetectorService
}

func NewFileRepository(
	fileService services.FileService,
	duplicateDetectorService services.DuplicateDetectorService,
) *FileRepositoryImpl {
	return &FileRepositoryImpl{
		fileService:              fileService,
		duplicateDetectorService: duplicateDetectorService,
	}
}

func (r *FileRepositoryImpl) ListFiles(folderPath string) ([]entities.FileInfo, error) {
	var files []entities.FileInfo

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

		files = append(files, entities.FileInfo{
			Path:          path,
			IsDir:         d.IsDir(),
			FolderPath:    filepath.Dir(path),
			Filename:      filepath.Base(path),
			Size:          size,
			HumanSize:     r.fileService.FormatSize(size),
			FileExtension: filepath.Ext(path),
			CreatedAt:     info.ModTime().Format(time.RFC3339),
			Selected:      false,
		})

		return nil
	})

	return files, err
}

func (r *FileRepositoryImpl) FindDuplicates(folderPath string) ([]entities.DuplicateFile, []entities.FileInfo, error) {
	files, err := r.ListFiles(folderPath)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to list files: %v", err)
	}

	duplicates, err := r.duplicateDetectorService.DetectDuplicates(files)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to detect duplicates: %v", err)
	}

	return duplicates, files, nil
}

func (r *FileRepositoryImpl) DeleteFiles(filesPaths []string, isPermanent bool) (string, error) {
	var errCount int
	var successCount int

	for _, filePath := range filesPaths {
		var err error
		if isPermanent {
			err = os.Remove(filePath)
		} else {
			err = utils.MoveToTrash(filePath)
		}

		if err != nil {
			errCount++
		} else {
			successCount++
		}
	}

	return fmt.Sprintf("Deleted %d files, %d failed", successCount, errCount), nil
}
