import streamlit as st
from rembg import remove
from PIL import Image, ImageColor, ImageOps
import io
import base64

class BackgroundRemover:
    def __init__(self):
        self.supported_formats = ['png', 'jpg', 'jpeg', 'webp']
        
    def process_image(self, image: Image.Image) -> Image.Image:
        """Remove background from the given image"""
        return remove(image)
    
    def add_background_color(self, image: Image.Image, color: str) -> Image.Image:
        """Add solid background color to transparent image"""
        if color.lower() == 'transparent':
            return image
        
        # Convert image to RGBA if not already
        if image.mode != 'RGBA':
            image = image.convert('RGBA')
            
        # Create a new RGB image with the selected color
        background = Image.new('RGB', image.size, ImageColor.getrgb(color))
        # Paste the original image (with transparency) onto the colored background
        background.paste(image, mask=image.split()[-1])  # Use alpha channel as mask
        return background
    
    def save_image(self, image: Image.Image, format: str = "PNG") -> tuple:
        """Save image to bytes and create download link"""
        buffered = io.BytesIO()
        image.save(buffered, format=format)
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return img_str
    
    def get_supported_formats(self) -> list:
        """Return list of supported image formats"""
        return self.supported_formats

class BackgroundRemoverUI:
    def __init__(self):
        self.remover = BackgroundRemover()
        self.setup_page_config()
        self.setup_styles()
        self.processed_image = None  # To store the processed image
        
    def setup_page_config(self):
        """Configure Streamlit page settings"""
        st.set_page_config(
            page_title="Background Remover - KaladiConverter",
            page_icon="🎨",
            layout="wide"
        )
    
    def setup_styles(self):
        """Setup custom CSS styles"""
        st.markdown("""
            <style>
            .main {
                background-color: #f5f5f5;
            }
            .stApp {
                max-width: 1200px;
                margin: 0 auto;
            }
            .title-container {
                text-align: center;
                padding: 2rem 0;
                background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
                border-radius: 15px;
                margin-bottom: 2rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .title-text {
                color: white;
                font-size: 2.5rem;
                font-weight: bold;
                margin: 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }
            .subtitle-text {
                color: white;
                font-size: 1.2rem;
                margin: 0.5rem 0 0 0;
            }
            .image-container {
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                margin-bottom: 2rem;
            }
            .stButton>button {
                background-color: #4CAF50;
                color: white;
                border-radius: 10px;
                padding: 0.5rem 1rem;
                font-weight: bold;
                border: none;
                transition: background-color 0.2s;
                width: 100%;
                margin-top: 1rem;
            }
            .stButton>button:hover {
                background-color: #45a049;
            }
            .info-box {
                padding: 1rem;
                border-radius: 10px;
                margin: 1rem 0;
                border-left: 5px solid #4CAF50;
                border: 2px solid #4CAF50;
            }
            .color-picker-container {
                margin: 1rem 0;
                padding: 1rem;
                background: #f9f9f9;
                border-radius: 10px;
            }
            .image-preview {
                margin-bottom: 1rem;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 10px;
            }
            </style>
            """, unsafe_allow_html=True)
    
    def render_header(self):
        """Render the page header"""
        st.markdown("""
            <div class="title-container">
                <h1 class="title-text">🎨 Background Remover</h1>
                <p class="subtitle-text">Remove background from any image and replace with custom colors</p>
            </div>
        """, unsafe_allow_html=True)
    
    def render_features(self):
        """Render the features information box"""
        st.markdown("""
            <div class="info-box">
                <h3>✨ Features</h3>
                <ul>
                    <li>Remove background from any image format (JPG, PNG, WEBP, etc.)</li>
                    <li>AI-powered background removal</li>
                    <li>Replace with custom background colors</li>
                    <li>Download with transparency or colored background</li>
                </ul>
            </div>
        """, unsafe_allow_html=True)
    
    def render_footer(self):
        """Render the page footer"""
        st.markdown("""
            <div style="text-align: center; margin-top: 3rem; padding: 2rem; color: #666; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 1.2rem;">Made with ❤️ by Subhan Kaladi</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Your one-stop solution for all conversion needs</p>
            </div>
        """, unsafe_allow_html=True)
    
    def render_color_picker(self):
        """Render the color picker section"""
        st.markdown('<div class="color-picker-container">', unsafe_allow_html=True)
        st.markdown("### Select Background Color")
        
        # Default color options
        default_colors = [
            ("Transparent", "transparent"),
            ("White", "#FFFFFF"),
            ("Black", "#000000"),
            ("Red", "#FF0000"),
            ("Green", "#00FF00"),
            ("Blue", "#0000FF"),
            ("Yellow", "#FFFF00"),
            ("Custom Color", "custom")
        ]
        
        # Create radio buttons for default colors
        selected_option = st.radio(
            "Choose a background color:",
            options=[opt[0] for opt in default_colors],
            index=0,
            horizontal=True
        )
        
        # Find the selected color
        selected_color = None
        for opt in default_colors:
            if opt[0] == selected_option:
                selected_color = opt[1]
                break
        
        # If custom color is selected, show color picker
        if selected_option == "Custom Color":
            selected_color = st.color_picker("Pick a custom color", "#00FF00")
        
        st.markdown('</div>', unsafe_allow_html=True)
        return selected_color
    
    def process_and_display_image(self, uploaded_file):
        """Process the uploaded image and display results"""
        if uploaded_file is not None:
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("### Original Image")
                image = Image.open(uploaded_file)
                st.image(image, use_container_width=True)
            
            if st.button("Remove Background", type="primary"):
                with st.spinner("Removing background..."):
                    # Process image to remove background
                    self.processed_image = self.remover.process_image(image)
                    
                    # Store in session state to persist across reruns
                    st.session_state.processed_image = self.processed_image
            
            # Show processed image and color options if available
            if 'processed_image' in st.session_state and st.session_state.processed_image is not None:
                # Show color picker after background removal
                selected_color = self.render_color_picker()
                
                # Display result
                with col2:
                    st.markdown("### Processed Image")
                    
                    # Display both versions
                    col2a, col2b = st.columns(2)
                    
                    with col2a:
                        st.markdown("**Transparent Background**")
                        st.image(st.session_state.processed_image, use_container_width=True)
                        
                    with col2b:
                        if selected_color and selected_color.lower() != "transparent":
                            st.markdown(f"**{selected_color} Background**")
                            colored_bg = self.remover.add_background_color(
                                st.session_state.processed_image, 
                                selected_color
                            )
                            st.image(colored_bg, use_container_width=True)
                    
                    # Create download links
                    st.markdown("### Download Options")
                    
                    # Transparent version download
                    img_str_transparent = self.remover.save_image(st.session_state.processed_image)
                    href_transparent = f'<a href="data:file/png;base64,{img_str_transparent}" download="transparent_bg.png" class="stButton">Download Transparent Version</a>'
                    st.markdown(href_transparent, unsafe_allow_html=True)
                    
                    # Colored version download (if color selected)
                    if selected_color and selected_color.lower() != "transparent":
                        img_str_colored = self.remover.save_image(colored_bg)
                        href_colored = f'<a href="data:file/png;base64,{img_str_colored}" download="colored_bg_{selected_color}.png" class="stButton">Download {selected_color} Background Version</a>'
                        st.markdown(href_colored, unsafe_allow_html=True)
    
    def run(self):
        """Main method to run the application"""
        self.render_header()
        self.render_features()
        
        st.markdown('<div class="image-container">', unsafe_allow_html=True)
        
        # File uploader
        uploaded_file = st.file_uploader(
            "Choose an image file",
            type=self.remover.get_supported_formats()
        )
        
        self.process_and_display_image(uploaded_file)
        
        st.markdown('</div>', unsafe_allow_html=True)
        self.render_footer()

# Create and run the application
if __name__ == "__main__":
    app = BackgroundRemoverUI()
    app.run()