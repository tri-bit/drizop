import React, { useState, useRef} from 'react';

import './drizop.scss';

const Drizop = (props)=> {

    //supported modes: list, image
    const mode = props.mode || 'list';
    const [active, setActive] = useState(false);
    const loadedFiles = useRef([]); //used by uploader component
    const loadedFileCount = useRef(0);
    const [displayFiles, setDisplayFiles] = useState(null);
    const droppedFiles = useRef([]); //actual file objects that will be delivered via callback
    const fileLimit = props.fileLimit || 8;
    const clearPreviousOnDrop = props.clearPreviousOnDrop || false;
    const button = props.button || false;

    const filesRemovable = true;

    const style = props.style || {};
    const message = props.message || 'Drop File(s) Here';
    const border = ' dashed ' || '';

    const progress = props.progress || 0;

    const filenameMax = 28;

    const allowedFileTypes = props.allowedFileTypes || null;
    const blockedFileTypes = 'dmg, exe, php';

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setActive(true);
    }

    const onDrop = (e) => {

        e.preventDefault();
        e.stopPropagation();

        handleFileAddition(e);
    }

    const handleFileAddition = (e)=> {


        if(isFileDropLocked()) return;

        if(clearPreviousOnDrop) {
            clearFiles();
        }

        let newFiles = e.target.files || e.dataTransfer.files;

        //[...newFiles].forEach(file => console.log(`file: ${file.name} type:${file.type}`));

        const currentFileNames = droppedFiles.current.map( file => { return file.name});


        //filter files
        newFiles =  filterNewFiles([...newFiles]);

        //remove already dropped files
        newFiles = [...newFiles].filter(file =>  {

            return (!currentFileNames.includes(file.name));

        });

        //remove new files beyond limit
        let emptySlots = fileLimit - droppedFiles.current.length;
        if(emptySlots < 0) {
            emptySlots = 0;
        }

        if(emptySlots > 0) {

            if(newFiles.length > emptySlots) {
               newFiles = newFiles.slice(0, emptySlots);
            }

            droppedFiles.current = [...droppedFiles.current, ...newFiles];
            loadFiles(newFiles);

        }


        if(props.onLoadCallback) {
            props.onLoadCallback(droppedFiles.current);
        }



    }


    const clearFiles = ()=> {

        droppedFiles.current = [];
        setDisplayFiles(null);
        loadedFiles.current = []; //used by uploader component
        loadedFileCount.current = 0;

    }


    const loadFiles = async files => {

        const filtered = [...files];

        const loaded = filtered.map(file => {

            const { name, size, type } = file;
            return {name, size, type, file };
        });

        //setup file reader
        loaded.forEach(loadedFile => {

            loadedFile.reader = new FileReader();
            loadedFile.reader.readAsDataURL(loadedFile.file);

            loadedFile.reader.onloadend = ()=> {

                loadedFile.dataURL = loadedFile.reader.result;

                loadedFileCount.current = loadedFileCount.current + 1;
                if(loadedFileCount.current === loadedFiles.current.length) {
                    //console.log(`all ${loadedFiles.current.length} files loaded`);
                    setDisplayFiles(loadedFiles.current);
                }

            }


        })


        loadedFiles.current = [...loadedFiles.current, ...loaded];
    }


    const onDragLeave = ()=> {

        setActive(false);



    }


    const handleFileRemoveClick = (fileName)=> {


        if(!isFileRemovalLocked()) {
            removeFile(fileName);
        }

    }

    const isFileDropLocked = ()=> progress > 0;

    const isFileRemovalLocked = ()=> progress > 0 || !filesRemovable;

    const removeFile = fileName => {

        loadedFiles.current = loadedFiles.current.filter(file => file.name !== fileName);
        loadedFileCount.current = loadedFiles.current.length;

        //sync droppedFiles with loadedFiles
        const loadedFileNames = loadedFiles.current.map( loaded => loaded.name.trim());

        droppedFiles.current = droppedFiles.current.filter(dropped => loadedFileNames.includes(dropped.name.trim()));


        setDisplayFiles(loadedFiles.current);

        //send updated list of files
        if(props.onLoadCallback) {
            props.onLoadCallback(droppedFiles.current);
        }
    }



    const getFileType = file => {

        if(file.type.indexOf('image/') !== -1) { return 'image' };
        if(file.type.indexOf('text/') !== -1) { return 'text' };
        if(file.type.indexOf('video/') !== -1) { return 'video' };

        return 'generic';

    }


    const getFileSize = file => `${(file.size / 1024).toFixed(2)} KB`;

    const getExtension = fileName => fileName.toLowerCase().substring(fileName.lastIndexOf('.'), fileName.length);

    const filterNewFiles = files => {


        /*
        if(mode === 'image') {
            return files.filter(file => getFileType(file) === 'image' );
        }
        */

        const blockedList = blockedFileTypes.toLowerCase().split(',').map(type => type.trim());
        const allowedList = allowedFileTypes ? allowedFileTypes.toLowerCase().split(',').map(type => type.trim().replace('.', '')) : null;

        const filtered = files.filter(file => {

            const extension = getExtension(file.name).replace('.', '');
            const allowedExtension = !blockedList.includes(extension) && (!allowedList || allowedList.includes(extension));
            //console.log(`allow?: ${file.name} ${extension} ${allow}`);

            const approved = allowedExtension;

            if(approved && (mode === 'image')) {
                return getFileType(file) === 'image';
            }

            return approved;
        })

        return filtered;

    }


    const renderPreview = (files)=> {


        if(!files) { return null }

        const removalIcon = <div className="removalIcon">X</div>;



        const imageFilesRender = displayFiles.map((file, index) => {

            const type = getFileType(file);
            //const extension = getExtension( file.name );


            if (file.dataURL && type === 'image') {
                return (
                <div className="galleryItem" key={index}>

                {!isFileRemovalLocked() && (
                <div className="removalOverlay"><div onClick={()=>{ handleFileRemoveClick(file.name)}}>{removalIcon}</div></div>
                )}

                <div className="infoWrap">{getExtension( file.name).toUpperCase()} <span className="divider">|</span> {getFileSize( file )}</div>
                <img key={index}  src={file.dataURL} />
                </div>
                )
            } else {
                //
            }


        })

        //compact, with file names, & size
        const compactFilesRender = displayFiles.map((file, index) => {

            const type = getFileType(file);
            const extension = getExtension( file.name );

            const fileNameTrim = file.name.length > filenameMax ? `${file.name.substring(0, filenameMax-3)}...` : file.name;

            return(

                <div className="compactFile" key={index} >

                    {!isFileRemovalLocked() && (
                    <div className="removalOverlay"><div onClick={()=>{ handleFileRemoveClick(file.name)}}>{removalIcon}</div></div>
                    )}

                    <div className="file">
                        <div className="fileLabel">{extension}</div>
                    </div>
                    <div className="fileLabels">

                        <div className="fileText fileName">{fileNameTrim}</div>
                        <div className="fileText fileSize">{getFileSize(file)}</div>
                    </div>
                </div>

            )


        });



        if(mode === 'list') return <><div className="compactFileWrap fadein">{compactFilesRender}</div></>
        if(mode === 'image') return <><div className="galleryWrap fadein">{imageFilesRender}</div></>


        //return <>{filesRender}</>
        return <><div className="compactFileWrap fadein">{compactFilesRender}</div></>

    }

    const shouldRenderProgress = ()=>  progress > 0 && droppedFiles.current.length > 0


    //https://tympanus.net/codrops/2015/09/15/

    const renderButton = ()=> {

        return(

            <>{/*<button onClick={handleButtonClick}>Or Click Here</button> */}
                <div class="uploadButton">
                    <input className="uploadInput" name="file" id="file" type="file" multiple onChange={(e)=> handleFileAddition(e)} />
                    <label onClick={console.log('test')} className="uploadLabel" >Click Here To Upload</label>
                </div>
            </>

        )


    }

    const handleButtonClick = (e)=>  {

        console.log('button click');

    }

    return(

        <div style={{maxWidth:'800', margin:'auto'}}>
        <div
            style={style}
            className={`uploader ${mode} ${active ? 'active' : ''}${border}`}
            onDragLeave={onDragLeave}
            onDrop={ (e)=> onDrop(e) }
            onDragOver={(e)=> onDragOver(e)}
        >
        { (!displayFiles || displayFiles.length == 0) && (
            <>
                <div className="message">{message}{button && renderButton()}</div>

            </>
        )}



        {renderPreview(displayFiles)}



        {/*render bar @ 0px height even if not used for correct transition animation from 0 progress*/}
        <div className="progressBarWrap" style={{height: shouldRenderProgress() ? 'inherit':0 }}><div className="progressBar" style={{width:`${progress}%`}}>
        {shouldRenderProgress() && (<div className="progressLabel">{`${progress}%`}</div>) }
        </div></div>

        </div>


        </div>

    )




}


export default Drizop;