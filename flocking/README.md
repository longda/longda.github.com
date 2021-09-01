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

### Buffer Geometry
`TODO`

### Computer Shader
`TODO`

This demo is largely inspired by an [example from three.js](https://threejs.org/examples/?q=bird#webgl_gpgpu_birds_gltf)


Go back to [flocking](http://davecancode.com/flocking/)

