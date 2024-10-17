import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    QuillModule,
    FormsModule,
  ],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent {
  content: string = '';
  sanitizedContent: SafeHtml = '';

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      [{ align: [] }], // Alignment options
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  constructor(private sanitizer: DomSanitizer) {}

  onContentChanged(event: any) {
    this.content = event.html;
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  saveContent() {
    console.log(this.content);
  }
}
