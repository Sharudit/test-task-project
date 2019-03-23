import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('uploadFile') uploadFile: ElementRef;
    title = 'test1';
    data = {
        "tree": [{
            "name": "Pictures",
            "type": "folder",
            "children": [{
                "name": "Family",
                "type": "folder",
                "children": [{
                    "name": "file1.jpgpppppppppppppppppppppppppppppppppppppppppp",
                    "type": "file"
                }, {
                    "name": "file2.jpg",
                    "type": "file"
                }, {
                    "name": "file3.jpg",
                    "type": "file"
                }]
            }, {
                "name": "foto21345.jpg",
                "type": "file"
            }, {
                "name": "foto2908776t.jpg",
                "type": "file"
            }]
        }, {
            "name": "Documents",
            "type": "folder",
            "children": [{
                "name": "Drafts",
                "type": "folder",
                "children": [{
                    "name": "Temporary",
                    "type": "folder",
                    "children": []
                },
                {
                    "name": "document9.docx",
                    "type": "file"
                }, {
                    "name": "document10.docx",
                    "type": "file"
                }, {
                    "name": "document99.docx",
                    "type": "file"
                }
                ]
            }, {
                "name": "price.docx",
                "type": "file"
            }, {
                "name": "vision.docx",
                "type": "file"
            }, {
                "name": "Trash",
                "type": "folder",
                "children": [{
                    "name": "doc1.docx",
                    "type": "file"
                }, {
                    "name": "doc2.docx",
                    "type": "file"
                }, {
                    "name": "doc3.docx",
                    "type": "file"
                }]
            }]
        }, {
            "name": "Games",
            "type": "folder",
            "children": [{
                "name": "tetris.exe",
                "type": "file"
            }, {
                "name": "gomoku.com",
                "type": "file"
            }, {
                "name": "pacman.com",
                "type": "file"
            }]
        }]
    };
    message: string;

    constructor() {
        this.dataSort(this.data.tree);
    }

    upload() {
        const input = this.uploadFile.nativeElement;
        if (!input.files[0]) {
            this.showMessage('Please select a file before clicking Upload');
        } else {
            const file = input.files[0];
            const fr = new FileReader();
            fr.readAsText(file);
            fr.onload = () => {
                try {
                    const newData = JSON.parse(fr.result as string);
                    this.data.tree = this.dataSort(newData.tree);
                } catch {
                    this.showMessage('Data is incorrect');
                }
            };
        }
    }

    dataSort(array) {
        array.sort((prev, next) => {
            if (prev.type === next.type) {
                return prev.name < next.name ? -1 : 1;
            } else {
                return prev.type === 'folder' ? -1 : 1;
            }
        })
            .forEach(x => x.children && this.dataSort(x.children));
        return array;
    }

    showMessage(text) {
        this.message = text;
        setTimeout(() => this.message = '', 3000);
    }

}
