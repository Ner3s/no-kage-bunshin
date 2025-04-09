package usecases

import (
	"fmt"
	"no-kage-bunshin/backend/domain/entities"
	"no-kage-bunshin/backend/domain/repositories"
	"no-kage-bunshin/backend/domain/services"
	"os"
)

type CloneResult struct {
	Clones        []entities.DuplicateFile `json:"clones"`
	ExtractedDirs []string                 `json:"extractedDirs"`
	AllFiles      []entities.FileInfo      `json:"allFiles"`
}

type FindDuplicatesUseCase struct {
	fileRepository           repositories.FileRepository
	fileService              services.FileService
	duplicateDetectorService services.DuplicateDetectorService
}

func NewFindDuplicatesUseCase(
	fileRepository repositories.FileRepository,
	fileService services.FileService,
	duplicateDetectorService services.DuplicateDetectorService,
) *FindDuplicatesUseCase {
	return &FindDuplicatesUseCase{
		fileRepository:           fileRepository,
		fileService:              fileService,
		duplicateDetectorService: duplicateDetectorService,
	}
}

func (uc *FindDuplicatesUseCase) Execute(folderPath string, tempFolderPrefix string) (*CloneResult, error) {
	tempDir, err := os.MkdirTemp("", tempFolderPrefix)
	defer os.RemoveAll(tempDir)
	if err != nil {
		return nil, fmt.Errorf("failed to create temp directory: %v", err)
	}

	duplicates, allFiles, err := uc.fileRepository.FindDuplicates(folderPath)
	if err != nil {
		return nil, fmt.Errorf("failed to find duplicates: %v", err)
	}

	var extractedDirs []string
	// TODO: NEED CREATE A FILTER FOR USER TO SELECT THE FILES TO EXTRACT
	// for _, file := range allFiles {
	// 	if !file.IsDir && uc.fileService.IsCompressed(file.Path) {
	// 		destFolder := filepath.Join(tempDir, filepath.Base(file.Path))
	// 		err := os.MkdirAll(destFolder, os.ModePerm)
	// 		if err != nil {
	// 			continue
	// 		}

	// 		err = uc.fileService.ExtractCompressedFile(file.Path, destFolder)
	// 		if err != nil {
	// 			continue
	// 		}

	// 		extractedDirs = append(extractedDirs, destFolder)
	// 	}
	// }

	var combinedClones []entities.DuplicateFile = duplicates
	// if len(extractedDirs) > 0 {
	// 	for _, dir := range extractedDirs {
	// 		extractClones, _, err := uc.fileRepository.FindDuplicates(dir)
	// 		if err != nil {
	// 			continue
	// 		}

	// 		combinedClones = uc.fileService.CombineClones(combinedClones, extractClones)
	// 	}
	// }

	return &CloneResult{
		Clones:        combinedClones,
		ExtractedDirs: extractedDirs,
		AllFiles:      allFiles,
	}, nil
}
