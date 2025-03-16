package models

type DuplicateFile struct {
	Original   string     `json:"original"`
	Duplicates []FileInfo `json:"duplicates"`
}
