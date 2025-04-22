import os
import json

def generate_directory_structure(root_dir):
    dir_structure = {}

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Визначаємо шлях відносно кореневої папки
        rel_path = os.path.relpath(dirpath, root_dir)
        current_level = dir_structure

        # Поділ шляху на частини і формування структури
        if rel_path != '.':
            for part in rel_path.split(os.sep):
                current_level = current_level.setdefault(part, {})

        current_level['_files'] = filenames

    return dir_structure


# Використання
root_directory = '.'  # замість '.' можна вказати шлях до потрібної папки
structure = generate_directory_structure(root_directory)

# Збереження структури у файл JSON
with open('directory_structure.json', 'w', encoding='utf-8') as f:
    json.dump(structure, f, ensure_ascii=False, indent=4)

print("Структура файлів і каталогів збережена в directory_structure.json")