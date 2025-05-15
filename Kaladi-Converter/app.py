# import streamlit as st

# # Set page configuration
# st.set_page_config(
#     page_title="KaladiConverter",
#     page_icon="🔄",
#     layout="wide",
#     initial_sidebar_state="expanded"
# )

# # Custom CSS for better styling
# st.markdown("""
#     <style>
#     .main {
#         background-color: #f5f5f5;
#     }
#     .stApp {
#         max-width: 1200px;
#         margin: 0 auto;
#     }
#     .navbar {
#         background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
#         padding: 1.5rem;
#         border-radius: 15px;
#         margin-bottom: 2rem;
#         box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#     }
#     .navbar-title {
#         color: white;
#         font-size: 2.5rem;
#         font-weight: bold;
#         text-align: center;
#         margin: 0;
#         text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
#     }
#     .converter-grid {
#         display: grid;
#         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
#         gap: 2rem;
#         padding: 1rem;
#     }
#     .converter-card {
#         background-color: white;
#         padding: 2rem;
#         border-radius: 15px;
#         box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#         transition: transform 0.2s, box-shadow 0.2s;
#         border: 1px solid #e0e0e0;
#         text-align: center;
#         cursor: pointer;
#     }
#     .converter-card:hover {
#         transform: translateY(-5px);
#         box-shadow: 0 6px 8px rgba(0,0,0,0.15);
#     }
#     .converter-icon {
#         font-size: 3rem;
#         margin-bottom: 1rem;
#     }
#     .converter-title {
#         color: #4CAF50;
#         font-size: 1.5rem;
#         margin-bottom: 0.5rem;
#         font-weight: bold;
#     }
#     .converter-description {
#         color: #666;
#         font-size: 1rem;
#         line-height: 1.5;
#     }
#     .stButton>button {
#         background-color: #4CAF50;
#         color: white;
#         border-radius: 10px;
#         padding: 0.5rem 1rem;
#         font-weight: bold;
#         border: none;
#         transition: background-color 0.2s;
#         width: 100%;
#         margin-top: 1rem;
#     }
#     .stButton>button:hover {
#         background-color: #45a049;
#     }
#     </style>
#     """, unsafe_allow_html=True)

# # Navbar
# st.markdown("""
#     <div class="navbar">
#         <h1 class="navbar-title">🔄 KaladiConverter</h1>
#     </div>
# """, unsafe_allow_html=True)

# # Welcome message
# st.markdown("""
#     <div style="text-align: center; margin-bottom: 2rem;">
#         <h2 style="color: #333; font-size: 2rem;">Welcome to KaladiConverter</h2>
#         <p style="color: #666; font-size: 1.2rem;">Your one-stop solution for all file conversion needs</p>
#     </div>
# """, unsafe_allow_html=True)

# # Converter cards
# converters = [
#     {
#         "title": "Document Converter",
#         "icon": "📄",
#         "description": "Convert between various document formats like PDF, DOCX, TXT, and more",
#         "page": "Document_Converter"
#     },
#     {
#         "title": "Image Converter",
#         "icon": "🖼️",
#         "description": "Convert images between different formats like JPG, PNG, WEBP, and more",
#         "page": "Image_Converter"
#     },
#     {
#         "title": "Video Converter",
#         "icon": "🎥",
#         "description": "Convert videos between different formats like MP4, AVI, MOV, and more",
#         "page": "Video_Converter"
#     },
#     {
#         "title": "Audio Converter",
#         "icon": "🎵",
#         "description": "Convert audio files between different formats like MP3, WAV, FLAC, and more",
#         "page": "Audio_Converter"
#     },
#     {
#         "title": "Spreadsheet Converter",
#         "icon": "📊",
#         "description": "Convert spreadsheets between different formats like XLSX, CSV, and more",
#         "page": "Spreadsheet_Converter"
#     },
#     {
#         "title": "Code Converter",
#         "icon": "💻",
#         "description": "Convert code files between different programming languages",
#         "page": "Code_Converter"
#     },
#     {
#         "title": "Archive Converter",
#         "icon": "📦",
#         "description": "Convert between different archive formats like ZIP, RAR, and more",
#         "page": "Archive_Converter"
#     },
#     {
#         "title": "Background Remover",
#         "icon": "🎨",
#         "description": "Remove background from any image with AI-powered technology",
#         "page": "Background_Remover"
#     }
# ]

# # Create a grid of converter cards
# st.markdown('<div class="converter-grid">', unsafe_allow_html=True)
# for converter in converters:
#     st.markdown(f"""
#         <div class="converter-card" onclick="window.location.href='/{converter['page']}'">
#             <div class="converter-icon">{converter['icon']}</div>
#             <div class="converter-title">{converter['title']}</div>
#             <div class="converter-description">{converter['description']}</div>
#         </div>
#     """, unsafe_allow_html=True)
# st.markdown('</div>', unsafe_allow_html=True)

# # Footer
# st.markdown("""
#     <div style="text-align: center; margin-top: 3rem; padding: 2rem; color: #666; border-top: 1px solid #e0e0e0;">
#         <p style="font-size: 1.2rem;">Made with ❤️ by Subhan Kaladi </p>
#         <p style="font-size: 0.9rem; margin-top: 0.5rem;">Your one-stop solution for all conversion needs</p>
#     </div>
# """, unsafe_allow_html=True) 