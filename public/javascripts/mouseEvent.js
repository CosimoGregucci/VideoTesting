import * as THREE from './build/three.module.js';

var camera1, camera2, scene, scene1, scene2, renderer;

var isUserInteracting = false,
lon = 0, lat = 0,
phi = 0, theta = 0,
distance = 50,
onPointerDownPointerX = 0,
onPointerDownPointerY = 0,
onPointerDownLon = 0,
onPointerDownLat = 0;

setTimeout(function() { 
    scene = document.getElementById('scene');
    scene1 = document.getElementById('scene_1').object3D;
    scene2 = document.getElementById('scene_2').object3D;
    camera1 = document.getElementById('camera1').object3D.children[0];
    camera2 = document.getElementById('camera2').object3D.children[0];
    console.log('### work it: stop loading scene and camera.')
}, 5000);


setTimeout(function(){
   
    init();
    animate();

    function init() {
    
        console.log('#### ' + scene1);
    
        var entityEl = document.createElement('a-entity');
        entityEl.setAttribute('text', {wrapCount: '120', width: '40', color: 'black', side:'double', value: ''});
        entityEl.setAttribute('position', '-5 20 20');
        scene.appendChild(entityEl);
        entityEl.setAttribute('visible', 'false');
    
        console.log('#### ' + camera1);
    
        camera1.target = new THREE.Vector3(0, 0, 0);
        camera2.target = new THREE.Vector3(0, 0, 0);

    
        renderer = new THREE.WebGLRenderer({
                antialias: false,
                alpha: true
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
    
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'wheel', onDocumentMouseWheel, false );
        
        window.addEventListener( 'resize', onWindowResize, false );
    }
    
    function onWindowResize() {
        camera1.aspect = window.innerWidth / window.innerHeight;
        camera1.updateProjectionMatrix();
        camera2.aspect = window.innerWidth / window.innerHeight;
        camera2.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    function onDocumentMouseDown( event ) {
        event.preventDefault();
    
        isUserInteracting = true;
    
        onPointerDownPointerX = event.clientX;
        onPointerDownPointerY = event.clientY;
    
        onPointerDownLon = lon;
        onPointerDownLat = lat;
    }
    
    function onDocumentMouseMove( event ) {
        if ( isUserInteracting === true ) {
            lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
            lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
        }
    }
    
    function onDocumentMouseUp() {
        isUserInteracting = false;
    }
    
    function onDocumentMouseWheel( event ) {
        distance += event.deltaY * 0.05;
        distance = THREE.MathUtils.clamp( distance, 1, 50 );
    }
    
    function animate() {
        requestAnimationFrame( animate );
        update();
    }
    
    function update() {
        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.MathUtils.degToRad( 90 - lat );
        theta = THREE.MathUtils.degToRad( lon );
    
        camera1.position.x = distance * Math.sin( phi ) * Math.cos( theta );
        camera1.position.y = distance * Math.cos( phi );
        camera1.position.z = distance * Math.sin( phi ) * Math.sin( theta );
    
        camera1.lookAt( camera1.target );
    
        camera2.position.x = distance * Math.sin( phi ) * Math.cos( theta );
        camera2.position.y = distance * Math.cos( phi );
        camera2.position.z = distance * Math.sin( phi ) * Math.sin( theta );
    
        camera2.lookAt( camera2.target );
    
        renderer.render( scene1, camera1);
        renderer.render( scene2, camera2);
    }
}, 6000);



