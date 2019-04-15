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
var controls;

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

  // controls
  controls = new THREE.OrbitControls( camera );
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.000001;
  // controls.maxAzimuthAngle = Math.PI / 10;
  // controls.maxPolarAngle = Math.PI / 10;
  // controls.minAzimuthAngle = -Math.PI / 10;
  // controls.minPolarAngle = -Math.PI / 10;


  // scenes
  scene = new THREE.Scene();

  // lights
  scene.add( new THREE.AmbientLight( 0x222222 ) );
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  // image
  var materialColor = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load( "nyan-cat.png" ),
      depthTest: false
    } );

  materialColor.transparent = true;

  quadBG = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1, 1 ), materialColor );
  quadBG.position.z = - 500;
  quadBG.scale.set( width, height, 1 );
  scene.add( quadBG );

  // post processing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  // shader passes
  var effectBloom = new THREE.BloomPass( 0.5 );
  composer.addPass(effectBloom);

  var effectFilm = new THREE.FilmPass( 0.35, 0.5, 2048, false );
  composer.addPass(effectFilm);

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
  controls.update();
  render();
  stats.end();
}

function render() {
  composer.render(delta);
}
