package persistence

import (
	"archive/zip"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"no-kage-bunshin/backend/domain/entities"
	"os"
	"path/filepath"
	"strings"
)

type FileServiceImpl struct{}

func NewFileService() *FileServiceImpl {
	return &FileServiceImpl{}
}

func (s *FileServiceImpl) GetFileHash(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	defer file.Close()

	hasher := sha256.New()
	if _, err := io.Copy(hasher, file); err != nil {
		return "", err
	}

	return hex.EncodeToString(hasher.Sum(nil)), nil
}

func (s *FileServiceImpl) FormatSize(size int64) string {
	const unit = 1024
	if size < unit {
		return fmt.Sprintf("%d B", size)
	}

	div, exp := int64(unit), 0
	for n := size / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}

	units := []string{"KB", "MB", "GB", "TB", "PB"}
	return fmt.Sprintf("%.1f %s", float64(size)/float64(div), units[exp])
}

func (s *FileServiceImpl) IsCompressed(filePath string) bool {
	ext := strings.ToLower(filepath.Ext(filePath))
	compressedExtensions := []string{".zip", ".rar", ".gz", ".tar", ".7z"}

	for _, compExt := range compressedExtensions {
		if ext == compExt {
			return true
		}
	}

	return false
}

func (s *FileServiceImpl) ExtractCompressedFile(filePath string, destination string) error {
	reader, err := zip.OpenReader(filePath)
	if err != nil {
		return err
	}
	defer reader.Close()

	for _, file := range reader.File {
		filePath := filepath.Join(destination, file.Name)

		if !strings.HasPrefix(filePath, filepath.Clean(destination)+string(os.PathSeparator)) {
			continue
		}

		if file.FileInfo().IsDir() {
			os.MkdirAll(filePath, os.ModePerm)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
			return err
		}

		outFile, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			return err
		}

		fileInArchive, err := file.Open()
		if err != nil {
			outFile.Close()
			return err
		}

		_, err = io.Copy(outFile, fileInArchive)
		outFile.Close()
		fileInArchive.Close()

		if err != nil {
			return err
		}
	}

	return nil
}

func (s *FileServiceImpl) CombineClones(originalClones, extractedClones []entities.DuplicateFile) []entities.DuplicateFile {
	cloneMap := make(map[string]entities.DuplicateFile)

	for _, clone := range originalClones {
		cloneMap[clone.Hash] = clone
	}

	for _, clone := range extractedClones {
		if existingClone, exists := cloneMap[clone.Hash]; exists {
			existingClone.Duplicates = append(existingClone.Duplicates, clone.Duplicates...)
			cloneMap[clone.Hash] = existingClone
		} else {
			cloneMap[clone.Hash] = clone
		}
	}

	var combinedClones []entities.DuplicateFile
	for _, clone := range cloneMap {
		combinedClones = append(combinedClones, clone)
	}

	return combinedClones
}
