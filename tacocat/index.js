if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container, stats;
var camera, scene, renderer, composer;
var light;
var quadBG;

var width = window.innerWidth || 2;
var height = window.innerHeight || 2;
var halfWidth = width / 2;
var halfHeight = height / 2;
var delta = 0.01;

init();
animate();

function init() {
  // renderers
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // cameras
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;

  // scenes
  scene = new THREE.Scene();

  // lights
  scene.add( new THREE.AmbientLight( 0x222222 ) );
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  // image
  var materialColor = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load( "logo-black-cat.jpg" ),
      depthTest: false
    } );

  quadBG = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1, 1 ), materialColor );
  quadBG.position.z = - 500;
  quadBG.scale.set( width, height, 1 );
  scene.add( quadBG );

  // post processing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  // shader passes

  // stats
  stats = new Stats();
  document.body.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  stats.begin();
  render();
  stats.end();
}

function render() {
  composer.render();
}
