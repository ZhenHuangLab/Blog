---
title: Diffraction & Interference
seo_title: Diffraction & Interference
summary: Diffraction and interference in microscopy and wave optics.
description: 
slug: microscopy-4
author: Zhen Huang

draft: false
date: 2024-03-28T14:36:22+08:00
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
    - Research Study
tags:
    - Notes
series:
    - Microscopy

toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
math: true
---

## Magnification vs Resolution

Many people just think about microscopes as big magnifying devices because they assume that if they want to make a better image that has more details and resolution, all they need to do is *magnifying* it.

And this may not seem even unreasonable, since a photon, the particle of light, has the ability to interact with matter and resolve things. This is so obvious that scientist have thought about ways of just magnifying more and more to study things at the atomic level.

One example teaches what's wrong with that idea that magnification is all one needs for light microscopy. Basically, the researchers achieved subatomic resolution levels by just using a copying machine.

![copying-machine-index-2024-04-16-00-15-02](https://lfs.zhenhuang.site/images/copying-machine-index-2024-04-16-00-15-02.png#small)

<span class="caption">I cannot find this paper on the internet now. Figure from the video[^1].</span>

Obviously, it's not a great idea because, if you look at a image taken by a camera and zoom it up more and more, you finally end up with an image which is just a bunch of dots, and there is not any more information you can get from it.

So it's very obvious to us that the image has a grain, but it's harder for us to imagine that light itself has a intrinsic grain that there might be a limit to the resolution.

But in fact, **light does have an intrinsic limit to its resolution, which is related to a phenomenon known as diffraction**.

## Diffraction

### Pinhole Camera

We would be able to generate very high resolution images that would be limited just by the size of photons, if light had traveled just in straight lines. To show why it doesn't work, we can take a look at the simplest of all optical imaging devices, the **pinhole camera**.

![pinhole-camera-index-2024-04-16-00-15-24](https://lfs.zhenhuang.site/images/pinhole-camera-index-2024-04-16-00-15-24.png#small)

<span class="caption">Light enters a dark box through a small hole and creates an inverted image. Image from wikipedia.[^2]</span>

And you may think that if you wanted higher resolution, you may just move the paper/wall (which has image on it) further and further away from the pinhole, and that should make a bigger and bigger image, so you should be able to see more and more details on it.

You may also think that because the pinhole is finite in size and is much more bigger than the particle of light, more than one ray from the top of the tree gets through the pinhole, so there's a little fuzziness to that image. It's also obvious that if you make the pinhole bigger and bigger, the image gets fuzzier and fuzzier. So you might say why not make the pinhole smaller and smaller, and then you would get a sharper image.

And it turns out that neither of these are true, and **this is the failing of ray optics and the failing of light microscopes**. In fact, the smaller the pinhole, the fuzzier the image gets, just like when the pinhole is bigger, the image gets fuzzier; if the pinhole is very small, the light bends in many directions, which is called diffraction.

### Wave Optics

In order to understand diffaction, we need to think about light as a wave.

![light-as-a-wave-index-2024-04-16-00-15-47](https://lfs.zhenhuang.site/images/light-as-a-wave-index-2024-04-16-00-15-47.png#small)

Light that is traveling in one direction is a **plane wave** (a 3D object). The plane is in one 2D surface, and right behind it is another one and another one, and these are the things that are oscillating. And the distance between these planes is the wavelength of the light.

And there is situation where the light travels out from a point and a spherically expanding wave is generated, which is called a **spherical wave**. Spherical wave can also converge and focus onto a point, which shows light being focused.

Light's direction is orthogonal to wave front. And the intensity is not related to the amplitude of the wave, but to the suqare. The amplitude moving across space is just the light wave looks at one instant in time. If we want to know what the cumulative amplitude of that wave is, we can integrate that intensity over time/wavelength, then we get a uniform value for the wave, which is the **intensity** (what you detect as **brightness**) of the light.

![amplitude-intensity-index-2024-04-16-00-18-26](https://lfs.zhenhuang.site/images/amplitude-intensity-index-2024-04-16-00-18-26.png#small)

Huygens postulated that light at its most elemental is a disturbance that propagates in all directions as a spherical wave. And he called these elements of light **wavelets**. So, not just that light travels in waves, but that there is a infinite small wave which is the basic component that generates plane waves and spherical waves.

![spherical-and-plane-wave-index-2024-04-16-00-18-46](https://lfs.zhenhuang.site/images/spherical-and-plane-wave-index-2024-04-16-00-18-46.png#small)

And this can also explain the bending of light. If you have a box with a point source in it and the light is sending it out in all directions, it is clear that you can not pnly get a straight line of light from the source because the light has bent at the pinhole, and this bending in this case is due to the fact that one wavelet is sending its energy in all directions.

![the-bending-of-light-index-2024-04-16-00-19-03](https://lfs.zhenhuang.site/images/the-bending-of-light-index-2024-04-16-00-19-03.png#small)

This is the wave optic view of the effect of the microscope lenses:

![wave-optic-view-index-2024-04-16-00-19-22](https://lfs.zhenhuang.site/images/wave-optic-view-index-2024-04-16-00-19-22.png#small)

## Interference

### Effect of Two Wavelets

Waves of one frequency that come from the same source at nearly the same time are coherent, which means they have the same phase or a predictable phase difference. When coherent waves coincide, they interfere with each other and their amplitudes add.

When they're exactly in phase, they add up to a wave that has twice the amplitude of the original wave, which is called *constructive interference*. When they're exactly out of phase, they cancel each other out, which is called *destructive interference*.

![Youngs-two-slit-experiment-index-2024-04-16-00-19-42](https://lfs.zhenhuang.site/images/Youngs-two-slit-experiment-index-2024-04-16-00-19-42.png#small)

<span class="caption">Young's two-slit experiment[^3] [^4]</span>

When multiple wavelets from the same source and same time (i.e., coherent) interact they set up understanding waves of *constructive* and *destructive* interference.

So we can understand the interference of light from two wavelets:

![interference-of-light-from-two-wavelets-index-2024-04-16-00-20-04](https://lfs.zhenhuang.site/images/interference-of-light-from-two-wavelets-index-2024-04-16-00-20-04.png#small)

* At an instant in time (top): Mesh of light and dark lines.
  * Dark & bright areas: have the *same* energy.
* Detectors (including the eye) collect *intensity*.
  * Intensity is the addition of a full cycle squared.
  * Dark area: destructive interference.
  * Bright area: constructive interference.

Think about how numerical aperture (NA) affects the converging spherical wave coming out of the tube lens. Say the distance of the furthest two wavelets means the aperture of the lens, as the figures show below:

![high-and-low-na-index-2024-04-16-00-27-27](https://lfs.zhenhuang.site/images/high-and-low-na-index-2024-04-16-00-27-27.pn#small)

It is obvious that if you have a high NA lens, a greater portion of the spherical wave is collected by the objective, which means the plane wave leaving the back aperture of the objective is wider, so **the distance between the furthest wavelets are farther apart than a low numerical aperture lens**.

So if we go further into the relationship between the NA and the diffraction patterns generated by two extreme wavelets, we can see that **high NA gives narrow fringes**. So, the finer the grating here, the higher the numerical aperture is.

This turns out to be critical because **any wavelets that are closer together can only generate bigger structures**, but cannot generate finer structures. So the limit of the resolution (or the quality of the image) is determined by how fine this fringe period can be.

![finest-fringes-determines-finest-details-index-2024-04-16-00-42-15](https://lfs.zhenhuang.site/images/finest-fringes-determines-finest-details-index-2024-04-16-00-42-15.png#small)

Another thing you need to think about is the wavelength of the light. If you have a light with a longer wavelength, the fringes are wider and farther apart, so you can't resolve as fine a detail as you can with a shorter wavelength light, as shown below:

![longer-shorter-wavelength-index-2024-04-16-00-42-42](https://lfs.zhenhuang.site/images/longer-shorter-wavelength-index-2024-04-16-00-42-42.png#small)

Generally, the shorter wavelengths of light will give you better quality images in terms of the finest details you can resolve. 

{{<notice tip>}}
This implys that **if you want high quality imaging, you should not simply think of the NA, but also the wavelength of the light**.
{{</notice>}}

### Effect of 3/5/9 wavelets

We can now add more and more wavelets on the spherical cap, and see how do these wavelets interfere with each other.

![three-wavelets-index-2024-04-16-00-45-28](https://lfs.zhenhuang.site/images/three-wavelets-index-2024-04-16-00-45-28.png#small)
<span class="caption">Effect of three wavelets[^5]</span>

![five-wavelets-index-2024-04-16-00-46-14](https://lfs.zhenhuang.site/images/five-wavelets-index-2024-04-16-00-46-14.png#small)
<span class="caption">Effect of five wavelets[^5]</span>

![nine-wavelets-index-2024-04-16-00-46-33](https://lfs.zhenhuang.site/images/nine-wavelets-index-2024-04-16-00-46-33.png#small)
<span class="caption">Effect of nine wavelets[^5]</span>

**The center of the primary image plane will be brighter and brighter**, and finally become the brightest as we have more and more wavelets, while **everywhere else things will get dimmer and dimmer**, because all of them will be in phase in the middle (getting more and more constructive interference due to **equidistance**), but there will be nowhere else where most of the wavelets are in phase. So that's why the image plane is here, and why you will get this kind of cone shape of focused, converging light -- <mark>simply by interference</mark>.

## Reference

Most of the content is from the youtube videos by Jeff Lichtman: [Microscopy: Diffraction (Jeff Lichtman)](https://www.youtube.com/watch?v=V8JXPqDWFcM), [Microscopy: Point Spread Function (Jeff Lichtman)](https://www.youtube.com/watch?v=JQy94K94nL0).

[^1]: [Microscopy: Diffraction (Jeff Lichtman)](https://www.youtube.com/watch?v=V8JXPqDWFcM)
[^2]: [Pinhole camera](https://en.wikipedia.org/wiki/Pinhole_camera)
[^3]: [What if the particles in the double slit experiment were conscious? Could you ask them which slit they went through afterwards? Ask a Mathematician / Ask a Physicist](https://www.askamathematician.com/2020/05/q-what-if-the-particles-in-the-double-slit-experiment-were-conscious-could-you-ask-them-which-slit-they-went-through-afterwards/)
[^4]: [Double slit experiment | Anton Paar Wiki](https://wiki.anton-paar.com/tr-tr/cift-yarik-deneyi/)
[^5]: [Microscopy: Point Spread Function (Jeff Lichtman)](https://www.youtube.com/watch?v=JQy94K94nL0)