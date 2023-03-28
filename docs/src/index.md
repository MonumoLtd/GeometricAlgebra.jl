```@meta
CurrentModule = GeometricAlgebra
```

# GeometricAlgebra.jl

Documentation for [GeometricAlgebra](https://github.com/MonumoLtd/GeometricAlgebra.jl).

_A Julia package implementing Geometric Algebra_. 

GeometricAlgebra provides implementations of various low-dimensional geometric algebras that are designed to be lightweight and fast. Each has its own unique representation and namespace, and it is possible to have multiple geometric algebras insantiated simultaneously. This allows the programmer to operate in whichever algebra is most efficient for a given task.

Two further algebras are also supported: GA(4,4) and GA(32,32). These are less optimised, and are provided more for investigation.

All algebras are defined over the reals and follow Julia's internal promotion rules. 


## Installation
```
pkg> add GeometricAlgebra
```

## First Example
```julia
using GeometricAlgebra
e = GA20.basis  # Creates a 2D basis, named 'e'.
a = e[1] + e[2]
b = 2.0*e[1] + 3*e[2] 
a*b  # Evaluates the geometric product of a and b.
```

# API

## Bases and the Even / Odd trick
This library employs an optimisation achieved by separating even and odd multivectors into separate types. This reduces the size of the representation and halves the time to compute a geometric product. An algebra-specific map is used to convert odd elements to even, so that both share the same representation. 

But there is an important consequence: **you cannot combine even and odd elements in any of the optimised algebras**. 

In practice it is highly unusual that you should want to combine even and odd elements, but there are some occasions where it does make sense. For these you should work in an algebra one dimension higher that contains the desired algebra in its even subalgebra. The most common example is special relativity. You might want to add a scalar to a vector in G(3,0) to model a 4-vector, but the implementation here will not allow it. So instead you should work one dimension higher, in the spacetime algebra G(1,3), which is the appropriate setting for relativistic calculations. 

The standard interface to an algebra is via a basis for each algebra. These can be accessed in two ways. First is by name, as `GA20.basis`, `GA30.basis` etc. There is also a  `basis()` function, which takes one, two or three integer arguments. Either approach can be called at any point in code to call into existence a copy of the basis vectors for the desired algebra, but note that the `basis()` function contains a number of switching statements, so if performance is critical call the basis by name.

 The coefficients in all of the basis vectors are all `Int8`, which get promoted to whatever the proagrmmer desires by multiplying by reals. All promotions are generated by Julia's internal rules/

The `basis()` function has the following properties: 
```julia
basis(p)  # Returns a basis for G(p,0), if it exists. If not it returns the nearest algebra that contains G(p,0).
basis(p,q)  # Returns a basis for G(p,q) if it exists. If not it returns the nearest basis that contains G(p,q).
basis(p,q,r)  # Returns a basis for G(p,q,r), where r generators are null if the algebra is implemented. If not it returns the nearest basis that contains G(p,q,r)
basis()  # Returns a list of all currently supported algebras and their internal names.
```

As well as accessing the basis via the basis function, each basis can be called directly by name, so for example `GA20.basis` is the name of the basis for G(2,0).

The following algebras are currently implemented, together with their name for `basis("name")` and the name of the basis:
* G(2,0), name: "GA20", basis: `GA20.basis`
* G(3,0), name: "GA30", basis: `GA30.basis`
* G(4,0), name: "GA40", basis: `GA40.basis`
* G(1,3), name: "STA", basis: `STA.basis`
* G(3,0,1), name: "PGA", basis: `PGA.basis`
* G(4,1), name: "CGA", basis: `CGA.basis`
* G(2,4), name: "GA24", basis: `GA24.basis`
* G(3,3), name: "GA33, basis: `GA33.basis`

Within each algebra you can also call the individual basis vectors by name, for example `GA20.e1` is a basis vector for G(2,0). 

Note that the constructors for each type are not exposed directly. They are all of the form `GeometricAlgebra.GA20.Even()`, for example. You should fine working directly with the basis vectors is the simplest way to create multivector objects.

In addition, two further algebras are provided with a separate implementation. For these there is no distinction between even and odd elements; everything is a single `Multivector` type. Some optimisations have been applied to these algebras, but they are not nearly as fast as the ones listed above.

* G(4,4), name: "GA44", basis: `GA44.basis`
* G(32,32), name: "GA3232", basis: `GA3232.basis`

Each of these algebras is described in more detail below, including listing the additional functions that are exposed that are algebra specific. For completeness we explain the map between even and odd elements used by our chosen representations, but this is all done automatically for you.



## Arithmetic Functions

Most of the functionality is provided by overloading the Base Julia functions, so +,-,* all behave as expected, as does division by a real. The library also builds on LinearAlebra and overloads three functions from there:

```julia
tr(A)  # The scalar part of A
dot(A,B)  # The scalar part of the product AB, usually written <AB>.
A' = adjoint(A)  # The reverse of A. 
```

`tr(A)` and `dot(A,B)` both return Reals, so take us out of whatever type is being employed for the arguments. These are key functions for extracting values at the end of geometric algebra calculation. Note that `tr(A*B)` and `dot(A,B)` return the same value, the scalar part of the geometric product `AB`. However, `dot(A,B)` contains optimisations to only calculate the relevant products and should be used in practice. 


### Projection
Projection onto a single grade is performed with the project operator

```julia
project(A,n)  # Returns the grade n component of A.
```
This operation returns a multivector object. 


### Exponentiation
An exponential operator is included for Even multivectors. Two versions exist

```julia
exp(A)  # Exponentiates the full even multivector A.
bivector_exp(A)  # Exponentiates the bivector part of A.
```
If the argument is a bivector both `exp(A)` and and `bivector_exp(A)` will written the same answer (to some precision). The reason for having a separate `bivector_exp(A)` command is that it can take advantage of various optimisations to ensure rotors are calculated as efficiently as possible. A separate command was thought to be more efficient than implementing a runtime check on the argumed of `exp(A)` to determine if the argument was a bivector.

### Further Functions
`inject` is a simple utility function for doting scalars into a basis set. The code is simple:
```julia
inject(xs,ys) = reduce(+,map((x,y)->x*y,xs,ys))
```

## Outer and Inner products
This library does not provide explicit enstantiations of the inner and outer products. The main reason for this is that we treat the geometric product as the primary operation in the algebra. Inner and outer products simply project the results onto specific grades. So, for example, the outer product of 2 vectors is simply
```julia
project(a * b, 2)  # Returns the outer product of a and b.
```
Given this, there is little point introducing a new operator for the outer or inner product. We encourage users to find ways to express their calculations using combinations of geometric products, reverse and projection onto grade. This generally leads to efficient implementations.

This library is focused on a fast implementation of the geometric product. All the building blocks are in place to build an implementation of exterior algebra should that be desired, though other Julia packages do exist for this.


## Namespaces
One advantage of how this library uses Julia's namespace and module structure is that it is straightforward to have multiple algbras in flight at one time. In a given application you may want to move elements between algebras, which can be achieved with the `dot` function mainly. There were too many cases to try and provide a single conversion function, and too many different ways of converting (projective split, conformal split ...). 

One function that is provided is a universal `embed` function that lifts elements into the G(4,4) algebra. This is primarily for testing purposes, but might form the basis for writing more specific applications.
```julia
embed(A)  # Takes a multivector from one of the smaller algebras and embeds it in G(4,4)
```

## Accuracy and display

The geometric product is associative and assumes that the number system it is built on is associative, commutative and distributive. Unfortunately Floating Point numbers cannot be guaranteed to satisfy these properties leading to small errors in computation. The effect of this is that some results that should algebraically be zero pick up a small non-zero component determined by machine precision. 

For the small algebras these terms live inside matrix representations and there is litte point trying to filter them out. Instead we filter at the point of displaying results. A tolerance is set and all multivector components with magnitude less than this are not displayed. This turns out to be a decent compromise in practice.

For G(4,4) and larger algebras, where a different representation is used, it is more important to prevent these small terms from growing in code, so they are explicitly filtered out at the end of each computation.


# The Core Algebras

## G(2,0)
* Name: `GA20`
* Basis: `GA20.basis`
* Basis vectors: `[GA20.e1, GA20.e2]`
* Other basis elements: `GA20.I2 = e1 * e2`
* Extra functions: `log, /, real, imag`

G(2,0) is the algebra of the Euclidean plane. Even elements are stored as complex numbers. Odd elements (vectors) are mapped to even elements via
```julia
a -> e[1]*a  # Map from odd to even.
```

As the even elements are complex numbers, some additional operations are permitted for these. As complex numbers are a division algebra, and the order is unambiguous we allow division for even elements in the this algebra.
```julia
A/B  # Divides the even multivector A by B. 
log(), real(), imag() # All act as expected. Note that imag returns a scalar, not a bivector.
```

## G(3,0)
* Name: `GA30`
* Basis: `GA30.basis`
* Basis vectors: `[GA30.e1, GA30.e2, GA30.e3]`
* Other basis elements: `GA30.I3 = e1 * e2 * e3`

G(3,0) is the algebra of Euclidean space, also called the Pauli algebra in quantum mechanics. Even elements form a quaternion algebra, which is how they are stored. Odd elements are mapped to even elements by the pseudoscalar,

```julia
M -> I3 * M  # Map from odd to even.
```

Quaternions do form a division alegebra, but they are not commutative so the `/` operator is not extended. Division is equivalent to multiplication by the inverse, and the inverse is easily formed by taking a reverse, `M -> M'` and dividing by `M M'`. It is safer to implement this directly as the code is then quite clear on the order.

## G(4,0)

* Name: `GA40`
* Basis: `GA40.basis`
* Basis vectors: `[GA40.e1, GA40.e2, GA40.e3, GA40.e4]`
* Other basis elements: `GA40.E4 = e1 * e2 * e3 *e4`

G(4,0) is the geometric algebra for 4D Euclidean space, though in practice it is most often used as the algebra for 3D projective geometry. In a projective setup vectors represent points, bivectors represent lines etc, and duality it performed by multiplication by `E4`.

The even algebra is isomorphic to two seperate quaternion algebras, which is how the algebra is implemented. Multiplication in this algebra is fast (even faster than PGA). Odd elements are mapped to even elements by right multiplication by `e4`,
```julia
M -> M * e4  # Map from odd to even.
```

## G(1,3), the STA
* Name: `STA`
* Basis: `STA.basis`
* Basis vectors: `[STA.g0, STA.g1, STA.g2, STA.g3]`
* Other basis elements:   
    * `STA.s1 = g1 * g0`
    * `STA.s2 = g2 * g0`
    * `STA.s3 = g3 * g0`
    * `STA.I4 = g0 * g1 * g2 * g3`
* Extra functions: `bar(M) = g0 * M * g0 `

The algebra G(1,3) is the geometric algebra for Minkowski spacetime, better known as the Spacetime Algebra (STA). STA is the standard abbreviationn for this algebra so is used for the namespace.

Even elements in the STA are isomorphic to 2X2 complex matrices (the full Pauli algebra), which is essentially how they are implemented here. (We acually unwrap the matrices and store the entries explicitly in a struct, which turns out to be slightly more efficient.)

The map between odd and even element is performed by right multiplication by `g0`.
```julia
M -> M * g0  # Map from odd to even.
```

Our implementation of the STA takes advantage of Julia's support for non-Ascii variables to pretty-type each `g` as a `γ`, and each `s` as a `σ`. This is in keeping with the conventions in the literature. But note that this is only a feature of the print command. In the code the elements are referred to as `g0`, `s1` etc. 

Note that the STA is also perfect for the conformal model of 2D Euclidean space, albeit with an overall sign flip in the signature. This is why currently there is no explicit algebra for G(3,1).


## G(3,0,1), the PGA
* Name: `PGA`
* Basis: `PGA.basis`
* Basis vectors: `[PGA.e1, PGA.e2, PGA.e3. PGA.e0]`
* Other basis elements: `PGA.I3 = e1 * e2 * e3`
* Extra functions `pdual()`

The somewhat unfortunately named _PGA_ is the algebra for the 3D Euclidean group. The first three generators all square to +1, but the 4th generator is null.
```julia
e0 * e0 = 0
```
This arrangement ensures that rotors in the PGA generate Eucldiean motions, rotations and translations, which has obvious benefits for graphics. The name _PGA_ originated from the idea that the algebra was also the most appropriate for projective geometry, but that is not really the case. For pure _projective_ geometry it is best to work in G(4,0). For a projective treatment of Euclidean geometry, PGA is a good choice.

Note that the PGA is a subalgebra of the CGA (see below), The CGA 'completes' the PGA, but at the expense of being a bigger algebra, so not as efficient. 

Even elements in the PGA are isomorphic to [dual quaternions](https://en.wikipedia.org/wiki/Dual_quaternion), which is how they are implemented. The map between odd and even elements is carried out using `I3`.
```julia
M -> I3 * M  # Map from odd to even.
```

### Duality
The fact that the pseudoscalar is null in PGA is a problem. Usually duality is implemented by multiplication by the pseudoscalar, which is very efficient. In PGA we need an operator that performs a similar function of mapping vectors to trivectors, etc. This is the function ```pdual()```. We follow the conventions of [De Keninck & Dorst](https://bivector.net/tools.html?p=3&q=0&r=1).
```julia
pdual(e0) = I3  # etc. Function for the PGA dual.
```

## G(4,1), the CGA
* Name: `CGA`
* Basis: `CGA.basis`
* Basis vectors: `[CGA.e1, CGA.e2, CGA.e3. CGA.e4, CGA.f4]`
* Other basis elements: `CGA.I5 = e1 * e2 * e3 * e4 * f4`

G(4,1) is the conformal algebra for 3D space, often called the conformal geometric algebra or CGA. This is the name used here, though note that any space with signature (p,q) has a conformal algebra G(p+1,q+1). The CGA contains the PGA as a subalgebra.

We explicitly use a basis of 4 positive norm vectors (`e1 ... e4`) and one negative norm (`f4`). The more familiar null basis elements are constructed from `e4` and `f4`. There are various conventions in use for this null basis, so rather than enforce one we leave it to the programmer to chose. These conventions spill over into the conformal representation of points as null vectors. The starting point for this is
```
X = 2x + (1 - x^2) * e4 + (1 + x^2) * f4 = 2x + (f4+e4) + x^2(f4-e4)
```
The two final vectors in the last term are null, and various conventions exist for labelling them, with differences in names, signs and factors of 2.


The even subalgebra of CGA is isomorphic to 2X2 matrices with quaternion entries, which is implemented by hard-coding the matrix product. This means that each product involves 8 quaternion products, compared to the 3 of PGA, and the 2 of G(4,0). So if speed is essential it is important to always be in the minimal algebra for a computation.

The map between odd and even is provided by the pseudoscalar. This will always be the case in odd-sized algebras.
```julia
M -> I5 * M # Map from odd to even.
```


## G(3,3) and line geometry.
* Name: `GA33`
* Basis: `GA33.basis`
* Basis vectors: `[GA33.e1, GA33.e2, GA33.e3. GA33.f1, GA33.f2, GA33.f3]`
* Other basis elements: `GA33.E6 = f1 * e1 * f2 * e2 * f3 * e3`

G(3,3) arises most naturally in the study of lines in three dimensions. In projective geometry lines are bivectors in G(4,0), so have 6 degrees of freedom, but they also satisfy a Plucker constraint which defines an inner product. This turns out to generate a space of signature (3,3), with null vectors representing lines. G(3,3) also arises in studying 2D conices.

The even subalgebra is isomorhic to a pair of 4X4 matrices, which are implemented using the [StaticArrays](https://juliaarrays.github.io/StaticArrays.jl/stable/) package. This has some performance benefits over LinearAlgebra. 

The map between odd and even elements is provided by `e1`
```julia
M -> M * e1  # Map from odd to even.
```

## G(2,4), conformal spacetime.
* Name: `GA24`
* Basis: `GA24.basis`
* Basis vectors: `[GA24.g0, GA24.g1, GA24.g2. GA24.g3, GA24.g4, GA24.g5]`
* Other basis elements: `GA24.I6 = g0 * g1 * g2 * g3 * g4 * g5`

G(2,4) is the conformal algebra for spacetime, sometimes called the twistor algebra. As well as modelling flat Minkowski spacetime, it also contains de Sitter and anti de Sitter geometries. We follow the most common convention in the literature by having
```
g0 * g0 = g5 * g5 = +1
g1 * g1 = g2 * g2 = g3 * g3 = g4 * g4 = -1
```
This looks a bit clumsy, but has the merit of embedding the expected signature for STA generators. Labeling the additional positive signature vector as ```g5``` seemed the least worst option, but of course this is easily changed in your own code.

The even subalgebra of G(2,4) is isomorphic to 4X4 complex matrices (and the spinors in this space are Penrose's twistors). Again, the [StaticArrays](https://juliaarrays.github.io/StaticArrays.jl/stable/) package is used to form the basic representation.

As wth the STA, the map between even and odd algebras is provided by `g0`. 
```julia
M -> M * g0  # Map from odd to even.
```

# The Large Algebras

Once we get to 8 dimensions the size of matrix required to represent elements get to 8X8, which is already quite inefficient. A different representation is required. (As an aside, the fact that 8 dimensions has an 8X8 matrix representation is the reason the octonion algebra exists, based on a map from spinors to vectors.)

For these large algebras we move to a representation where multivectors are stored as a list of basis blades and componets. The basis blades are stored as integers where the binary representation of the integer encodes the blade. One effect of this representation is that we no longer distinguish between even and odd elements as distinct.  All elements have the same type and can be combined.

This representation is considerably more compact than matrices, but has the downside that general products can be more expensive as we consider the product of every possible combination. Some work could be avoided by using an idempotent decomposition, but this is not implemented in the current code. For now this will have to be implemented on a case-by-case basis.

## G(4,4)
* Name: `GA44`
* Basis: `GA44.basis`
* Basis vectors: `[GA44.e1, GA44.e2, GA44.e3, GA44.e4, GA44.f1, GA44.f2, GA44.f3, GA44.f4]`
* Extra functions `contruct44`

Basis blades are labeled as `UInt8` and their product is encoded via some low-level binary functions. To claw back some performance we use the [SparseArrays](https://docs.julialang.org/en/v1/stdlib/SparseArrays/)  package to implement the sum. Multivectors are expanded into a 256-component vector, added, then sparsified back.

A constructor is exposed, `construct44()` to put elements in the appropriate order, but in practice we recommend using the basis vectors to construct multivectors.
```julia
construct44(T, bas::Vector{UInt8} , val::Vector{T})  # Construct a multivector with basis blades `bs` and values `val`.
```
Clearly to use this constructor you need to study the binary representation of blades.


## G(32,32)
* Name: `GA3232`
* Basis: `GA3232.basis`
* Extra functions `contruct3232`

The implementation is similar to GA(4,4), except now basis blades are represented as a `UInt64`. It is not feasible to use the sparse vector trick here, so addition requires some fiddly list manipulations. While the binary trick is fast, this algebra is never going to be highly performant.

The only way to access the generator vectors is via the basis. 
```julia
GA3232.basis[1] = e1
GA3232.basis[2] = f1
...
GA3232.basis[63] = e32
GA3232.basis[64] = e64
```

It is worth point out just how big G(32,32) actually is. This algebra contains 2^64 different basis elements. Just storing one element takes us into the exabyte regime! In practice working in this algebra probably means manipulating a few low-grade objects, typically just vectors and bivectors. For these the algebra will perform well.