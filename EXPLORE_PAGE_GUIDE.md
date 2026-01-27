# Explore Portfolio Page - Complete Guide

## Overview
The Explore Portfolio page is a stunning, interactive showcase of your AI/ML projects featuring a scroll-morph animation that transforms between scatter, line, circle, and arc formations.

## Features

### 1. Scroll-Morph Hero Animation
- **Scatter Phase** → Images scattered randomly on screen
- **Line Phase** → Images align in a horizontal line
- **Circle Phase** → Images form a perfect circle
- **Arc Phase** → Images morph into an arc formation at bottom with parallax

### 2. Interactive Project Cards
- 3D flip animation on hover
- Click to view detailed project information
- Shows tech stack and links to GitHub/demo
- Responsive design for all screen sizes

### 3. Features
- **Virtual scroll handling** - Smooth scroll without page scroll
- **Mouse parallax** - Cards respond to cursor position
- **ResizeObserver** - Adapts to viewport changes
- **Touch support** - Full mobile compatibility

## File Structure

```
/app/explore/
├── page.tsx                 # Main explore page component

/components/ui/
├── scroll-morph-hero.tsx   # Reusable scroll animation component
```

## Usage

### Accessing the Page
Navigate to `/explore` or click "Explore" in the navigation bar.

### Customizing Projects
Edit the `PROJECTS` array in `/app/explore/page.tsx`:

```typescript
const PROJECTS = [
  {
    title: "Your Project",
    description: "Short description",
    image: "/path/to/image.png",
    tech: ["Tech1", "Tech2"],
    details: "Detailed description",
    github: "https://github.com/...",
    demo: "https://demo-url.com",
  },
  // ... more projects
];
```

### Using the Component Elsewhere
```typescript
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";

<ScrollMorphHero 
  images={imageArray} 
  onCardClick={(index) => console.log(index)}
/>
```

## Components

### ScrollMorphHero
Props:
- `images: string[]` - Array of image URLs
- `onCardClick?: (index: number) => void` - Callback when card is clicked

## Styling

The page uses:
- **Tailwind CSS** for layout and responsive design
- **Framer Motion** for animations
- **Gradient backgrounds** from slate-950 to black
- **Blue accent colors** for interactive elements

## Performance Tips

1. **Image Optimization** - Use optimized images (WebP if possible)
2. **Lazy Loading** - Images load on demand
3. **ResizeObserver** - Only active when element is in viewport
4. **Spring Animations** - Smooth 60fps animations with reduced CPU load

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Animations not smooth?
- Clear browser cache
- Check for CSS conflicts
- Verify framer-motion is latest version

### Images not showing?
- Ensure image paths are correct
- Check CORS headers for external images
- Use `crossOrigin="anonymous"` for remote images

### Touch scroll not working?
- Ensure `passive: false` in touch event listeners
- Test on actual device (not just mobile emulation)

## Next Steps

1. Replace placeholder images with your project screenshots
2. Add GitHub and demo links
3. Customize project descriptions
4. Adjust colors to match your brand
5. Add more projects as needed

---

**Created**: January 2026
**Last Updated**: January 27, 2026
