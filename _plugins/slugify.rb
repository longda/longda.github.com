module Jekyll
    module SlugifyFilter
      def slugify(input)
        input
          .downcase                   # Convert to lowercase
          .gsub(/[^a-z0-9\s-]/, '')   # Remove special characters
          .gsub(/\s+/, '-')           # Replace spaces with hyphens
          .strip                      # Remove leading/trailing whitespace
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::SlugifyFilter)
  