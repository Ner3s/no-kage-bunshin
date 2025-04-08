FRONTEND_DIR=frontend
BACKEND_DIR=.

.PHONY: clean install build

clean:
	@echo "Limpando dependências do frontend..."
	@rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/package-lock.json

install:
	@echo "Instalando dependências do frontend..."
	@cd $(FRONTEND_DIR) && npm install

build:
	@echo "Buildando a aplicação..."
	@wails build

all: clean install build
