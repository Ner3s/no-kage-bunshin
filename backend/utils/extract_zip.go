package utils

import (
	"archive/zip"
	"io"
	"os"
	"path/filepath"
)

func ExtractZIP(zipPath, destFolder string) error {
	r, err := zip.OpenReader(zipPath)
	if err != nil {
		return err
	}
	defer r.Close()

	for _, file := range r.File {
		fpath := filepath.Join(destFolder, file.Name)

		if file.FileInfo().IsDir() {
			os.MkdirAll(fpath, os.ModePerm)
			continue
		}

		// Extrair arquivo
		rc, err := file.Open()
		if err != nil {
			return err
		}
		defer rc.Close()

		outFile, err := os.Create(fpath)
		if err != nil {
			return err
		}
		defer outFile.Close()

		_, err = io.Copy(outFile, rc)
		if err != nil {
			return err
		}
	}
	return nil
}
