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
var mouseX = 0, mouseY = 0;

var stars = [];

init();
animate();

function init() {

  // renderers
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // cameras
  camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1800;

  // controls
  // controls = new THREE.OrbitControls( camera );
  // controls.enablePan = false;
  // controls.enableZoom = false;
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;
  // controls.maxAzimuthAngle = 0.05;
  // controls.maxPolarAngle = 1.57 + 0.05;
  // controls.minAzimuthAngle = -0.05;
  // controls.minPolarAngle = 1.57 - 0.05;
  // controls.rotateSpeed = 0.01;


  // scenes
  scene = new THREE.Scene();

  // lights
  scene.add( new THREE.AmbientLight( 0x222222 ) );
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  // image
  var materialColor = new THREE.MeshBasicMaterial( {
      //map: new THREE.TextureLoader().load( "nyan-cat.png" ),
      map: new THREE.TextureLoader().load( "tacocat.png" ),
      depthTest: false
    } );

  materialColor.transparent = true;

  quadBG = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1, 1 ), materialColor );
  quadBG.position.z = - 500;
  quadBG.scale.set( width, height, 1 );
  scene.add( quadBG );
  //controls.target = quadBG.position;

  // text
  // var loader = new THREE.FontLoader();
  // loader.load('fonts/roboto_mono_bold.typeface.json', function(font) {
  //   var xMid, text;
	// 	var color = 0xffffff;
  //
	// 	var matLite = new THREE.MeshBasicMaterial( {
	// 		color: color,
	// 		transparent: true,
	// 		opacity: 0.8,
	// 		side: THREE.DoubleSide
	// 	} );
  //
  //   var message = "TACOCAT\nINTERACTIVE";
  //   var shapes = font.generateShapes( message, 100 );
  //   var geometry = new THREE.ShapeBufferGeometry( shapes );
  //   geometry.computeBoundingBox();
  //   xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
  //   geometry.translate( xMid, 0, 0 );
  //   // make shape ( N.B. edge view not visible )
  //   text = new THREE.Mesh( geometry, matLite );
  //   text.position.y = - 100;
  //   text.position.z = - 150;
  //   scene.add( text );
  // });

  // stars
  if (true) {
    var x_min = -1200;
    var x_max = 1200;
    var y_min = -800;
    var y_max = 800;
    var z_min = 550;
    var z_max = 850;
    var o_min = 0.2;
    var o_max = 1.0;

    var g = new THREE.PlaneGeometry(2, 2);
    var m = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});

    for (var i = 0; i < 1000; i++) {
      m.opacity = THREE.Math.randFloat(o_min, o_max);
      var p = new THREE.Mesh(g, m);
      p.position.set(THREE.Math.randInt(x_min, x_max), THREE.Math.randInt(y_min, y_max), -THREE.Math.randInt(z_min, z_max));
      scene.add(p);
      stars.push(p);
    }
  }

  // post processing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  // shader passes
  // var effectBloom = new THREE.BloomPass( 0.5 );
  // composer.addPass(effectBloom);

  var colorify = new THREE.ShaderPass(THREE.ColorifyShader);
  colorify.uniforms['color'] = new THREE.Uniform(new THREE.Color(0.2, 0.8, 0.2));
  composer.addPass(colorify);

  var effectFilm = new THREE.FilmPass( 0.35, 0.5, 2048, false );
  composer.addPass(effectFilm);

  var glitchPass = new THREE.GlitchPass();
	composer.addPass(glitchPass);

  // stats
  stats = new Stats();
  document.body.appendChild( stats.dom );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  width = window.innerWidth || 2;
  height = window.innerHeight || 2;
  halfWidth = width / 2;
  halfHeight = height / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - halfWidth );
  mouseY = ( event.clientY - halfHeight );
}

function animate() {
  requestAnimationFrame( animate );
  stats.begin();
  //controls.update();
  animateStars();
  render();
  stats.end();
}

function animateStars() {
  for (var i = 0; i < stars.length; i++) {
    //stars[i].materials[0].opacity =
  }
};

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * 0.001;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.001;

  camera.position.x = THREE.Math.clamp(camera.position.x, -220.0, 220.0);


	camera.lookAt( scene.position );

  composer.render(delta);
}
