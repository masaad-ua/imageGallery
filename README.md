# ImageGallery #

This image gallery was done according to test task from Viseven;

### What there have to be done###

#### Technical requirements: ####
* Run task using HTML5, CSS3, JavaScript;
* It is allowed to use auxiliaries to complete the task
JS libraries and HTML & CSS preprocessors;
* Screen resolution: 1024x768px;
* Webkit support for browsers;
* The design is in the file viseven-test-task.psd;
* The completed task must be started without additional steps
(installation of dependencies, building, etc.) and also necessarily
should contain index.html at the root of the archive;
* Download the archive at https://academy.qapint.com/.

#### Functionality: ####
* You need to implement a gallery of images with the possibility
add new ones;
* The attached image occupies the nearest free area;
* Placeholder aligns in the upper right corner of
last added picture;
* If the pictures do not fit into the horizontal area,
there is a scrolling.
* The "hover" of each item displays information about
current image showing the number of comments, likes
and dislays (icons are non-clips);
* A clicks on a picture will pop up a window where you can
put likes and dislikes, and leave comments.
If the comments do not fit into the block, it appears
vertical scrolling;
* When the popup closes, the gallery returns from
updated image data.

### How I did it ###

* Using js framework AngularJS 1.5
* For saving images i used indexDB
* For changing coordinate element with class "placeholder" using localStorage, all this are deleted after closing inset

### DEMO ###

The demo you can see here:
https://masaad-ua.github.io/imageGalleryGIT/
