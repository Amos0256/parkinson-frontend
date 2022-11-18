import React, { useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import './UploadBox.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function FileUpload() {
    const [files, setFiles] = useState([]);
    return (
        <div className='filepond-upload'>
            <FilePond 
                files={files}
                onupdateFiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                server="/api"
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
        </div>
    )
}