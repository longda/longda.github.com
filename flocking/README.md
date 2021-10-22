# Flocking 🐠🐠🐠

[Flocking](https://en.wikipedia.org/wiki/Flocking_(behavior)), in terms of computer science, is a technique used to mimic natural phenomena of large groups of small animals in simulations.  

Flocks of birds, schools of fish, swarms of insects, and colonies of bacteria all demonstrate similar behaviors of this technique.  It can lead to many diverse, beautiful emergent behaviors.

Flocking, the [algorithm](http://www.red3d.com/cwr/boids/) dates back to a paper from 1987 by [Craig W. Reynolds](http://www.red3d.com/cwr/index.html) called ["Flocks, Herds, and Schools: A Distributed Behavioral Model."](https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/) 

The simple model consists of three components:

1. Separation or collision avoidance: avoid collisions with nearby flockmates
1. Alignment or velocity matching: attempt to match the velocity and heading with nearby flockmates
1. Cohesion or flock centering: attempt to stay close to nearby flockmates 

Flocking is still used today in video games, visual effects for film, and generative art, as well as many other applications.  It is closely related to another technique called "Boids" - also coined by the same author - and related to particle systems.

## Demo Code in three.js

This demo has a few key parts to achieve the simulation.  

First, a Buffer Geometry is used to model the random birds instantiated at runtime.  

Second, a computer shader is used to drive the simulation, move the birds around in 3D space, and implement the flocking behaviors.

Last, uniforms and a texture are used to update the data and simulation parameters in the computer shader which then calculates changes in position and velocity.

### Buffer Geometry
<!-- `TODO` -->
A [Buffer Geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) in three.js is the base class for common geometries such as [Box](https://threejs.org/docs/api/en/geometries/BoxGeometry.html), [Sphere](https://threejs.org/docs/api/en/geometries/SphereGeometry.html), [Octahedron](https://threejs.org/docs/#api/en/geometries/OctahedronGeometry), and more.  

A Buffer Geometry is a container for data required for rendering that geometry including things like vertex positions, normals, colors, etc.

This data container is set up in a way such that it is very efficient for the javascript environment to pass this data to the GPU for rendering and computation.

Creating a new Buffer Geometry is as easy as calling the constructor:
```javascript
const BirdGeometry = new THREE.BufferGeometry();
```

Next, we can pack additional data onto this geometry with [Buffer Attributes](https://threejs.org/docs/?q=geometry#api/en/core/BufferAttribute) using the `setAttribute()` method which allows us to define a name, data type, and size for the attributes.  
```javascript
BirdGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
BirdGeometry.setAttribute('birdColor', new THREE.BufferAttribute(new Float32Array(color), 3));
BirdGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(color), 3));
BirdGeometry.setAttribute('reference', new THREE.BufferAttribute(new Float32Array(reference), 4));
BirdGeometry.setAttribute('seeds', new THREE.BufferAttribute(new Float32Array(seeds), 4));
```


To be even more efficient, an [Instanced Buffer Geometry](https://threejs.org/docs/?q=inst#api/en/core/InstancedBufferGeometry) can be used when you have a very large number of the same geometry being used but each instance can have individualized data for color or scale.

### Computer Shader
Rather than using the browser update loop to do the calculations, we'll be using a computer shader to directly utilize the GPU hardware.

At initialization, uniforms are packed into a texture and passed into the shader.

```
positionUniforms["time"] = { value: 0.0 }
positionUniforms["delta"] = { value: 0.0 }
velocityUniforms["time"] = { value: 1.0 }
velocityUniforms["delta"] = { value: 0.0 }
velocityUniforms["testing"] = { value: 1.0 }
velocityUniforms["separationDistance"] = { value: 1.0 }
velocityUniforms["alignmentDistance"] = { value: 1.0 }
velocityUniforms["cohesionDistance"] = { value: 1.0 }
velocityUniforms["freedomFactor"] = { value: 1.0 }
```

While the simulation is running, changes to data are submitted to the shader via the texture during the update/render loop on subsequent calls to `requestAnimationFrame()`.

```
positionUniforms["time"].value = now;
positionUniforms["delta"].value = delta;
velocityUniforms["time"].value = now;
velocityUniforms["delta"].value = delta;
```

The compute shader is then executed with this new data:
```
gpuCompute.compute();
```

And finally a call to the renderer to display the animation for this frame:

```
renderer.render(scene, camera);
```

This demo is largely inspired by an [example from three.js](https://threejs.org/examples/?q=bird#webgl_gpgpu_birds_gltf)


Go back to [flocking](http://davecancode.com/flocking/)

