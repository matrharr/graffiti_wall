class PaintingsController < ApplicationController

  def today
    @today_painting = Painting.find(1)
      if request.xhr?
        render json: @today_painting
      end
  end

  def save_addition
   params['clickXArray'].map!(&:to_i)
   params['clickYArray'].map!(&:to_i)
   params['clickDragArray'].map!(&:to_b)
    
    @painting = Painting.find(1)
    @painting.update(clickXArray: params['clickXArray'], clickYArray: params['clickYArray'], clickDragArray: params['clickDragArray'])
  end


end
