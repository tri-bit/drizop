
# Drizop
Easy to use file drop for React. Includes list and image gallery modes, file extension filtering and progress bar.

![alt text](https://github.com/tri-bit/drizop/blob/master/docs/images/drizop_02.png?raw=true "Example")
##### Images source: Pexels.com

Files can be removed by hovering over and clicking the x icon:

![alt text](https://github.com/tri-bit/drizop/blob/master/docs/images/drizop_07.png?raw=true "Example2")

## Usage
```jsx
import  Drizop  from '@tri-bit/drizop';

//place list mode file drop
<Drizop onLoadCallback={handleFileDrop} />
//file drop example with props usage
<Drizop
	mode="image"
	onLoadCallback={handleFileDrop}
	allowedFileTypes="txt,doc,rtf"
	message="Drop your document(s) here"
	fileLimit={3}
	style={{border:"3px solid black"}}
/>
```

## Props

| props | description |
--- | ---
| mode | "image" or "list" (Default value: "list")
| onLoadCallback | Use this callback to send the dropped files to your application (for uploading, etc.) Every time a new file is dropped or a file removed this callback will send the updated file array.
| allowedFileTypes | a comma seperated string of the allowed extensions (Example: "png, txt, jpg")
| progress | You can display upload progress percentage (0-100) Setting above zero will lock file drops / removal.
| message | Text in the center of component. (Default value: 'Drop File(s) Here')
| fileLimit | Sets max number of files allowed (Default value: 8)
| style | style object applied to Drizop component (Default value: {})

## Notes
* .dmg, .exe, .php extensions are automatically blocked (your backend should still do safety checks on uploaded files just to be safe.)
* You can use the optional style prop to easily change Drizop's width or border style (and more.)




