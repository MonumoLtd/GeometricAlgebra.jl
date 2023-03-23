#Test suite for Geometric LinearAlgebra
using Test

@testset "GA Tests" begin
    include("test20.jl")
    include("test30.jl")
    include("testSTA.jl")
    include("test40.jl")
    include("testPGA.jl")
    include("testCGA.jl")
    include("test33.jl")
    include("test24.jl")
    include("test44.jl")
    include("test64.jl")
end
