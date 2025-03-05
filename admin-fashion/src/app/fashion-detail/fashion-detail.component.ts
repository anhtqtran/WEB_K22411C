import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Fashion } from '../classes/Fashion';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';

@Component({
    selector: 'app-fashion-detail',
    standalone: false,
    templateUrl: './fashion-detail.component.html',
    styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
    fashion: Fashion = new Fashion();
    isAdding: boolean = false;
    isEditing: boolean = false;
    errorMessage: string = '';
    public Editor = ClassicEditor;
    public editorConfig: EditorConfig = {
        toolbar: {
            items: [
                'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'
            ],
            shouldNotGroupWhenFull: false
        },
        placeholder: 'Type or paste your content here!',
        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDE5OTY3OTksImp0aSI6ImVlZDIzOWU3LTVlOWItNGU4MC04MTdjLTAwMTQ0MTFlNDc1MSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjVlMmE0YWQxIn0.J50el4pOZzDWsKthZ9tkLKH99LmG1diN3avOYX9wntTHw8NPXIUQzXjgeY4k7xTs4Q21WsHKmwTV1zWX5-9MHA'
    };

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const editMode = this.route.snapshot.queryParamMap.get('edit');

        if (id === 'add') {
            this.isAdding = true;
            this.isEditing = false;
        } else if (id) {
            this.isAdding = false;
            this.isEditing = editMode === 'true';
            this.http.get<Fashion>(`http://localhost:4000/api/fashions/${id}`).subscribe({
                next: (data) => this.fashion = data,
                error: (err) => this.errorMessage = 'Lỗi khi tải Fashion: ' + err.message
            });
        }

        const editorElement = document.querySelector('#editor') as HTMLElement;
        if (editorElement) {
            ClassicEditor.create(editorElement, this.editorConfig)
                .then(editor => {
                    return editor;
                })
                .catch(error => {
                    console.error('Error initializing CKEditor:', error);
                });
        }
    }

    onEditorReady(event: any) {
        event.setData(this.fashion.fashion_detail || '');
    }

    saveEditorData(data: string) {
        this.fashion.fashion_detail = data;
    }

    save() {
        console.log("ID gửi đi:", this.fashion._id); // Giữ log để kiểm tra
        if (this.isAdding) {
            this.http.post('http://localhost:4000/api/fashions', this.fashion).subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => this.errorMessage = err.error.errors
                    ? err.error.errors.map((e: any) => e.msg).join(', ')
                    : 'Lỗi khi thêm Fashion'
            });
        } else if (this.isEditing) {
            this.http.put(`http://localhost:4000/api/fashions/${this.fashion._id}`, this.fashion).subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => this.errorMessage = err.error.errors
                    ? err.error.errors.map((e: any) => e.msg).join(', ')
                    : 'Lỗi khi cập nhật Fashion'
            });
        }
    }

    cancel() {
        if (this.isEditing) {
            this.isEditing = false;
            console.log('Hủy chỉnh sửa');
        } else {
            this.router.navigate(['/']);
        }
    }
}