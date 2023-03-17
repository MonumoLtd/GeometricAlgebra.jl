 #=
Core code for the implementation of GA(4,1).
Representation is as a 2x2 matrix of quaternions.
=#

import ..project
import ..expb

using ..Quaternions

struct Even{T<:Real} <: Number
    q1::Quaternion{T}
    q2::Quaternion{T}
    q3::Quaternion{T}
    q4::Quaternion{T}
end

struct Odd{T<:Real} <: Number
    q1::Quaternion{T}
    q2::Quaternion{T}
    q3::Quaternion{T}
    q4::Quaternion{T}
end

Base.zero(a::Even) = Even(zero(a.q1),zero(a.q1),zero(a.q1),zero(a.q1))
Base.zero(a::Odd) = Odd(zero(a.q1),zero(a.q1),zero(a.q1),zero(a.q1))
Base.one(a::Even) = Even(one(a.q1),zero(a.q1),zero(a.q1),one(a.q1))


function Base.convert(::Type{Even{T}},a::Even) where {T <: Real} 
    return Even{T}(convert(Quaternion{T},a.q1), convert(Quaternion{T}, a.q2), 
                    convert(Quaternion{T},a.q3), convert(Quaternion{T}, a.q4))
end

function Base.convert(::Type{Odd{T}},a::Odd) where {T <: Real} 
    return Odd{T}(convert(Quaternion{T},a.q1), convert(Quaternion{T}, a.q2), 
                    convert(Quaternion{T},a.q3), convert(Quaternion{T}, a.q4))
end


#Addition / subtraction

#Addition / subtraction
Base.:(-)(a::Even) = Even(-a.q1,-a.q2,-a.q3,-a.q4)
Base.:(-)(a::Odd) = Odd(-a.q1,-a.q2,-a.q3,-a.q4)
Base.:(+)(a::Even,b::Even) = Even(a.q1 + b.q1, a.q2 + b.q2, a.q3 + b.q3, a.q4 + b.q4)
Base.:(+)(a::Odd,b::Odd) = Odd(a.q1 + b.q1, a.q2 + b.q2, a.q3 + b.q3, a.q4 + b.q4)
Base.:(-)(a::Even,b::Even) = Even(a.q1 - b.q1, a.q2 - b.q2, a.q3 - b.q3, a.q4 - b.q4)
Base.:(-)(a::Odd,b::Odd) = Odd(a.q1 - b.q1, a.q2 - b.q2, a.q3 - b.q3, a.q4 - b.q4)


#Scalar addition / subtraction. Other cases are in GAcommon
Base.:(+)(num::Number,a::Even) = Even(a.q1 + num, a.q2, a.q3, a.q4 + num)
Base.:(-)(num::Number,a::Even) = Even(-a.q1 + num, -a.q2, -a.q3, -a.q4 +num)


#Multiplication
Base.:(*)(num::Number,a::Even) = Even(num*a.q1, num*a.q2, num*a.q3, num*a.q4)
Base.:(*)(num::Number,a::Odd) = Odd(num*a.q1, num*a.q2, num*a.q3, num*a.q4)

function Base.:(*)(a::Even,b::Even)
    Even( a.q1*b.q1 - a.q2*b.q3,
            a.q1*b.q2 + a.q2*b.q4,
            a.q3*b.q1 + a.q4*b.q3,
            a.q4*b.q4 - a.q3*b.q2)    
end

function Base.:(*)(a::Even,b::Odd)
    Odd( a.q1*b.q1 - a.q2*b.q3,
            a.q1*b.q2 + a.q2*b.q4,
            a.q3*b.q1 + a.q4*b.q3,
            a.q4*b.q4 - a.q3*b.q2)    
end

function Base.:(*)(a::Odd,b::Even)
    Odd( a.q1*b.q1 - a.q2*b.q3,
            a.q1*b.q2 + a.q2*b.q4,
            a.q3*b.q1 + a.q4*b.q3,
            a.q4*b.q4 - a.q3*b.q2)    
end

function Base.:(*)(a::Odd,b::Odd)
    Even( -a.q1*b.q1 + a.q2*b.q3,
            -a.q1*b.q2 - a.q2*b.q4,
            -a.q3*b.q1 - a.q4*b.q3,
            -a.q4*b.q4 + a.q3*b.q2)    
end


#Reverse
LinearAlgebra.adjoint(a::Even) = Even(conj(a.q4),conj(a.q2), conj(a.q3), conj(a.q1))
LinearAlgebra.adjoint(a::Odd) = Odd(conj(a.q4),conj(a.q2), conj(a.q3), conj(a.q1))


#Grade and projection
function project(a::Even,n::Integer)
    if (n==0)
        return Even((a.q1.w+a.q4.w)/2*one(a.q1), zero(a.q1), zero(a.q1), (a.q1.w+a.q4.w)/2*one(a.q1))
    elseif (n==2)
        qtmp = imag_part((a.q1+a.q4)/2)
        stmp = (a.q1.w - a.q4.w)/2
        return Even(stmp+qtmp, imag_part(a.q2), imag_part(a.q3), -stmp+ qtmp )
    elseif (n==4)
        qtmp = imag_part((a.q1-a.q4)/2)
        return Even(qtmp, real_part(a.q2), real_part(a.q3), -qtmp )
    else
        return zero(a)
    end
end

function project(a::Odd,n::Integer)
    if (n==5)
        return Odd((a.q1.w+a.q4.w)/2*one(a.q1), zero(a.q1), zero(a.q1), (a.q1.w+a.q4.w)/2*one(a.q1))
    elseif (n==3)
        qtmp = imag_part((a.q1+a.q4)/2)
        stmp = (a.q1.w - a.q4.w)/2
        return Odd(stmp+qtmp, imag_part(a.q2), imag_part(a.q3), -stmp+ qtmp )
    elseif (n==1)
        qtmp = imag_part((a.q1-a.q4)/2)
        return Odd(qtmp, real_part(a.q2), real_part(a.q3), -qtmp )
    else
        return zero(a)
    end
end


LinearAlgebra.tr(a::Even) = (a.q1.w + a.q4.w)/2
LinearAlgebra.dot(a::Even, b::Even) = (dot(a.q1,b.q1) - dot(a.q2,b.q3) + dot(a.q4,b.q4) - dot(a.q3,b.q2))/2
LinearAlgebra.dot(a::Odd, b::Odd) = -(dot(a.q1,b.q1) - dot(a.q2,b.q3) + dot(a.q4,b.q4) - dot(a.q3,b.q2))/2  


#Exponentiation
#Uses a simple scale and square implementation.
function Base.exp(a::Even)
    anrm = dot(a.q1,conj(a.q1))+dot(a.q2,conj(a.q2))+dot(a.q3,conj(a.q3))+dot(a.q4,conj(a.q4))
    s = max(ceil(Int,log(2,anrm))-1,0)
    a = 1/2^s*a
    res = 1+a
    powa = a
    for i in 2:12
        powa *= a/i
        res += powa
    end
    while s > 0
        res = res*res
        s -= 1
    end
    return res
end


#Remove non-bivector terms. 
#TODO - investigate if closed form gives any performance benefits. Suspect all the if statements would slow this down.
function expb(a::Even)
    a = project(a,2)
    R = exp(a)
    delt = R*R'-1
    return (1-0.5*delt + 0.375*delt*delt)*R
end  


#Comparison
Base.isapprox(a::Even, b::Even) = isapprox(a.q1,b.q1) && isapprox(a.q2, b.q2) && isapprox(a.q3,b.q3) && isapprox(a.q4, b.q4)
Base.isapprox(a::Odd, b::Odd) = isapprox(a.q1,b.q1) && isapprox(a.q2, b.q2) && isapprox(a.q3,b.q3) && isapprox(a.q4, b.q4) 
