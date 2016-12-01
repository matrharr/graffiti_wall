class PaintingsController < ApplicationController

  def today
    @most_recent_painting = Painting.last
    if request.xhr?
      render json: @most_recent_painting
    end
  end

  def save_addition
    params['clickXArray'].map!(&:to_i)
    params['clickYArray'].map!(&:to_i)
    params['clickDragArray'].map!(&:to_b)
    params['clickWidthArray'].map!(&:to_i)
    
    @painting = Painting.find(2)
    @painting.update(clickXArray: params['clickXArray'], clickYArray: params['clickYArray'], clickDragArray: params['clickDragArray'], clickColorArray: params['clickColorArray'], clickWidthArray: params['clickWidthArray'])
  end

  def test
  end


end
