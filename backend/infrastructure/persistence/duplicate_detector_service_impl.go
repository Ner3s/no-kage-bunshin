package persistence

import (
	"no-kage-bunshin/backend/domain/entities"
	"no-kage-bunshin/backend/domain/services"
	"sort"
	"time"
)

type DuplicateDetectorServiceImpl struct {
	fileService services.FileService
}

func NewDuplicateDetectorService(fileService services.FileService) *DuplicateDetectorServiceImpl {
	return &DuplicateDetectorServiceImpl{
		fileService: fileService,
	}
}

func (s *DuplicateDetectorServiceImpl) DetectDuplicates(files []entities.FileInfo) ([]entities.DuplicateFile, error) {
	filesByHash := make(map[string][]entities.FileInfo)

	for _, file := range files {
		if file.IsDir {
			continue
		}

		hash, err := s.fileService.GetFileHash(file.Path)
		if err != nil {
			continue
		}

		filesByHash[hash] = append(filesByHash[hash], file)
	}

	var duplicates []entities.DuplicateFile
	for hash, filesGroup := range filesByHash {
		if len(filesGroup) > 1 {
			sortedFiles, err := s.DetectOldestFile(filesGroup)
			if err != nil {
				continue
			}

			duplicateFile := entities.DuplicateFile{
				Hash:       hash,
				Original:   sortedFiles[0],
				Duplicates: sortedFiles[1:],
			}

			duplicates = append(duplicates, duplicateFile)
		}
	}

	return duplicates, nil
}

func (s *DuplicateDetectorServiceImpl) DetectOldestFile(files []entities.FileInfo) ([]entities.FileInfo, error) {
	sort.Slice(files, func(i, j int) bool {
		timeI, err := time.Parse(time.RFC3339, files[i].CreatedAt)
		if err != nil {
			return false
		}

		timeJ, err := time.Parse(time.RFC3339, files[j].CreatedAt)
		if err != nil {
			return false
		}

		return timeI.Before(timeJ)
	})

	return files, nil
}
