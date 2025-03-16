package models

type DuplicateFile struct {
	Hash       string     `json:"hash"`
	Original   FileInfo   `json:"original"`
	Duplicates []FileInfo `json:"duplicates"`
}
