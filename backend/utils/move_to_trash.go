package utils

import (
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"strings"
)

func MoveToTrash(path string) error {
	if path == "" {
		return fmt.Errorf("path cannot be empty")
	}

	if _, err := os.Stat(path); os.IsNotExist(err) {
		return fmt.Errorf("file not found: %s", path)
	}

	switch runtime.GOOS {
	case "windows":
		return moveToTrashWindows(path)
	case "darwin":
		return moveToTrashMac(path)
	case "linux":
		return moveToTrashLinux(path)
	default:
		return fmt.Errorf("unsupported operating system: %s", runtime.GOOS)
	}
}

func moveToTrashWindows(path string) error {
	winPath := strings.ReplaceAll(path, "/", "\\")

	script := `Add-Type -AssemblyName Microsoft.VisualBasic; ` +
		`[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("` + winPath + `", ` +
		`'OnlyErrorDialogs', 'SendToRecycleBin')`

	cmd := exec.Command("powershell", "-Command", script)
	if output, err := cmd.CombinedOutput(); err != nil {
		return fmt.Errorf("failed to move to recycle bin: %v - %s", err, string(output))
	}
	return nil
}

func moveToTrashMac(path string) error {
	cmd := exec.Command("osascript", "-e",
		`tell application "Finder" to delete POSIX file "`+path+`"`)

	if output, err := cmd.CombinedOutput(); err != nil {
		return fmt.Errorf("failed to move to trash: %v - %s", err, string(output))
	}
	return nil
}

func moveToTrashLinux(path string) error {
	trashCommands := []struct {
		cmd  string
		args []string
	}{
		{"trash-put", []string{path}},
		{"gio", []string{"trash", path}},
		{"gvfs-trash", []string{path}},
	}

	for _, tc := range trashCommands {
		if path, err := exec.LookPath(tc.cmd); err == nil {
			cmd := exec.Command(path, tc.args...)
			if _, err := cmd.CombinedOutput(); err == nil {
				return nil
			}
		}
	}

	return fmt.Errorf("no trash utility found. Please install one of: trash-cli, gio, gvfs-tools")
}
