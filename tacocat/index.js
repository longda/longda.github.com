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
  controls.dampingFactor = 0.25;
  controls.maxAzimuthAngle = 0.05;
  controls.maxPolarAngle = 1.57 + 0.05;
  controls.minAzimuthAngle = -0.05;
  controls.minPolarAngle = 1.57 - 0.05;
  controls.rotateSpeed = 0.01;


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
  controls.target = quadBG.position;

  // text
  var loader = new THREE.FontLoader();
  loader.load('fonts/roboto_mono_bold.typeface.json', function(font) {
    var xMid, text;
		var color = 0xffffff;

		// var matDark = new THREE.LineBasicMaterial( {
		// 	color: color,
		// 	side: THREE.DoubleSide
		// } );

		var matLite = new THREE.MeshBasicMaterial( {
			color: color,
			transparent: true,
			opacity: 0.8,
			side: THREE.DoubleSide
		} );

    var message = "TACOCAT\nINTERACTIVE";
    var shapes = font.generateShapes( message, 100 );
    var geometry = new THREE.ShapeBufferGeometry( shapes );
    geometry.computeBoundingBox();
    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid, 0, 0 );
    // make shape ( N.B. edge view not visible )
    text = new THREE.Mesh( geometry, matLite );
    text.position.y = - 100;
    text.position.z = - 150;
    scene.add( text );
  });

  // stars
  if (true) {
    var x_min = -1000;
    var x_max = 1000;
    var y_min = -800;
    var y_max = 800;
    var z_min = -1000;
    var z_max = -550;
    var g = new THREE.PlaneGeometry();
    var m = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});

    for (var i = 0; i < 50; i++) {
      var p = new THREE.Mesh(g, m);
      p.position.set(Math.randInt(x_min, x_max), Math.randInt(y_min, y_max), Math.randInt(z_min, z_max));
      scene.add(p);
    }
  }

  // post processing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  // shader passes
  // var effectBloom = new THREE.BloomPass( 0.5 );
  // composer.addPass(effectBloom);

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
  // console.log("az angle:", controls.getAzimuthalAngle());
  // console.log("polar angle:", controls.getPolarAngle());
  render();
  stats.end();
}

function render() {
  composer.render(delta);
}
