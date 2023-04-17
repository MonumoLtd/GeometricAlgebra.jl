var documenterSearchIndex = {"docs":
[{"location":"reference/#API-reference","page":"Reference","title":"API reference","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"","category":"page"},{"location":"reference/#Core-functions","page":"Reference","title":"Core functions","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"project","category":"page"},{"location":"reference/#GeometricAlgebra.project","page":"Reference","title":"GeometricAlgebra.project","text":"project(multivector::T, n::Integer) -> T\n\nProject a given multivector of type T so that only the component of grade n is kept.\n\nThe function will always return a multivector of the same type as that passed in. If n is such that multivector does not contain this grade (e.g. because n is odd, and the multivector is an even type), then we will return a zero multivector.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Modules","page":"Reference","title":"Modules","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"There is one submodule for each algebra we support.  These are listed below:","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"GA20\nGA24\nGA30\nGA33\nGA40\nGA44\nGA3232\nPGA\nSTA","category":"page"},{"location":"reference/#GeometricAlgebra.GA20","page":"Reference","title":"GeometricAlgebra.GA20","text":"GA20\n\nModule representing the GA(2, 0) geometric algebra. Even and odd elements are stored as complex numbers.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.GA24","page":"Reference","title":"GeometricAlgebra.GA24","text":"GA24\n\nModule representing the GA(2,4) geometric algebra.\n\nThis is the conformal algebra for spacetime. Even and odd elements are stored as complex Static Arrays.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.GA30","page":"Reference","title":"GeometricAlgebra.GA30","text":"GA30\n\nModule representing the GA(3, 0) geometric algebra. Underlying rep is quaternions, but not used explicitly here to keep this code self-contained.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.GA33","page":"Reference","title":"GeometricAlgebra.GA33","text":"GA33\n\nModule for GA(3,3). Base representation is a pair of 4x4 static arrays.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.GA40","page":"Reference","title":"GeometricAlgebra.GA40","text":"GA40\n\nCode for GA(4,0). Even and odd elements are stored as quaternion pairs.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.GA44","page":"Reference","title":"GeometricAlgebra.GA44","text":"GA44\n\nUses a list-based approach to multivector storage. Not as fast as smaller algebras, but useful for checks.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.GA3232","page":"Reference","title":"GeometricAlgebra.GA3232","text":"GA3232\n\nModule representing the GA(32,32) geometric algebra.\n\nNot optimised in any way, but useful for some experimentation. Use with caution. GA(32,32) is very BIG!\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.PGA","page":"Reference","title":"GeometricAlgebra.PGA","text":"PGA\n\nCode for GA(3,0,1). The Euclidean group algebra. C Core representation is a quaternion pair.\n\n\n\n\n\n","category":"module"},{"location":"reference/#GeometricAlgebra.STA","page":"Reference","title":"GeometricAlgebra.STA","text":"STA\n\nCode for GA(1,3). Even and odd elements are stored as complex structs. 2x2 matrix products are unwrapped. Gamma and sigma used for pretty typing.\n\n\n\n\n\n","category":"module"},{"location":"reference/#Quaternions","page":"Reference","title":"Quaternions","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"note: Note\nThis submodule is considered an implementation detail for GeometricAlgebra.","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [GeometricAlgebra.Quaternions]","category":"page"},{"location":"reference/#GeometricAlgebra.Quaternions","page":"Reference","title":"GeometricAlgebra.Quaternions","text":"Quaternions\n\nQuaternion code. This is called by some of the later GA implementations.\n\nThe core mirrors much of the GA code structure. For completeness we have defined a division operation for quaternions as they are a division algebra.\n\n\n\n\n\n","category":"module"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = GeometricAlgebra","category":"page"},{"location":"#GeometricAlgebra.jl","page":"Home","title":"GeometricAlgebra.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for GeometricAlgebra.","category":"page"},{"location":"","page":"Home","title":"Home","text":"A Julia package implementing Geometric Algebra. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"GeometricAlgebra provides implementations of various low-dimensional geometric algebras that are designed to be lightweight and fast. Each has its own unique representation and namespace, and it is possible to have multiple geometric algebras insantiated simultaneously. This allows the programmer to operate in whichever algebra is most efficient for a given task.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Two further algebras are also supported: GA(4,4) and GA(32,32). These are less optimised, and are provided more for investigation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"All algebras are defined over the reals and follow Julia's internal promotion rules. ","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"pkg> add GeometricAlgebra\njulia> using LinearAlgebra\njulia> using GeometricAlgebra","category":"page"},{"location":"","page":"Home","title":"Home","text":"The GeometricAlgebra package overloads some commands from LinearAlgebra so it is necessary to be using both packages.","category":"page"},{"location":"#First-Example","page":"Home","title":"First Example","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using GeometricAlgebra\ne = GA20.basis  # Creates a 2D basis, named 'e'.\na = e[1] + e[2]\nb = 2.0*e[1] + 3*e[2] \na*b  # Evaluates the geometric product of a and b.","category":"page"},{"location":"#API","page":"Home","title":"API","text":"","category":"section"},{"location":"#Bases-and-the-Even-/-Odd-trick","page":"Home","title":"Bases and the Even / Odd trick","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This library employs an optimisation achieved by separating even and odd multivectors into separate types. This reduces the size of the representation and halves the time to compute a geometric product. An algebra-specific map is used to convert odd elements to even, so that both share the same representation. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"But there is an important consequence: you cannot combine even and odd elements in any of the optimised algebras. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"In practice it is highly unusual that you should want to combine even and odd elements, but there are some occasions where it does make sense. For these you should work in an algebra one dimension higher that contains the desired algebra in its even subalgebra. The most common example is special relativity. You might want to add a scalar to a vector in G(3,0) to model a 4-vector, but the implementation here will not allow it. So instead you should work one dimension higher, in the spacetime algebra G(1,3), which is the appropriate setting for relativistic calculations. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The standard interface to an algebra is via a basis for each algebra. These can be accessed in two ways. First is by name, as GA20.basis, GA30.basis etc. There is also a  basis() function, which takes one, two or three integer arguments. Either approach can be called at any point in code to call into existence a copy of the basis vectors for the desired algebra, but note that the basis() function contains a number of switching statements, so if performance is critical call the basis by name.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The coefficients in all of the basis vectors are all Int8, which get promoted to whatever the proagrmmer desires by multiplying by reals. All promotions are generated by Julia's internal rules/","category":"page"},{"location":"","page":"Home","title":"Home","text":"The basis() function has the following properties: ","category":"page"},{"location":"","page":"Home","title":"Home","text":"basis(p)  # Returns a basis for G(p,0), if it exists. If not it returns the nearest algebra that contains G(p,0).\nbasis(p,q)  # Returns a basis for G(p,q) if it exists. If not it returns the nearest basis that contains G(p,q).\nbasis(p,q,r)  # Returns a basis for G(p,q,r), where r generators are null if the algebra is implemented. If not it returns the nearest basis that contains G(p,q,r)\nbasis()  # Returns a list of all currently supported algebras and their internal names.","category":"page"},{"location":"","page":"Home","title":"Home","text":"As well as accessing the basis via the basis function, each basis can be called directly by name, so for example GA20.basis is the name of the basis for G(2,0).","category":"page"},{"location":"","page":"Home","title":"Home","text":"The following algebras are currently implemented, together with their name for basis(\"name\") and the name of the basis:","category":"page"},{"location":"","page":"Home","title":"Home","text":"G(2,0), name: \"GA20\", basis: GA20.basis\nG(3,0), name: \"GA30\", basis: GA30.basis\nG(4,0), name: \"GA40\", basis: GA40.basis\nG(1,3), name: \"STA\", basis: STA.basis\nG(3,1), name: \"GA31\", basis: GA31.basis\nG(3,0,1), name: \"PGA\", basis: PGA.basis\nG(4,1), name: \"CGA\", basis: CGA.basis\nG(2,4), name: \"GA24\", basis: GA24.basis\nG(3,3), name: \"GA33, basis: GA33.basis","category":"page"},{"location":"","page":"Home","title":"Home","text":"Within each algebra you can also call the individual basis vectors by name, for example GA20.e1 is a basis vector for G(2,0). ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note that the constructors for each type are not exposed directly. They are all of the form GeometricAlgebra.GA20.Even(), for example. You should fine working directly with the basis vectors is the simplest way to create multivector objects.","category":"page"},{"location":"","page":"Home","title":"Home","text":"In addition, two further algebras are provided with a separate implementation. For these there is no distinction between even and odd elements; everything is a single Multivector type. Some optimisations have been applied to these algebras, but they are not nearly as fast as the ones listed above.","category":"page"},{"location":"","page":"Home","title":"Home","text":"G(4,4), name: \"GA44\", basis: GA44.basis\nG(32,32), name: \"GA3232\", basis: GA3232.basis","category":"page"},{"location":"","page":"Home","title":"Home","text":"Each of these algebras is described in more detail below, including listing the additional functions that are exposed that are algebra specific. For completeness we explain the map between even and odd elements used by our chosen representations, but this is all done automatically for you.","category":"page"},{"location":"#Arithmetic-Functions","page":"Home","title":"Arithmetic Functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Most of the functionality is provided by overloading the Base Julia functions, so +,-,* all behave as expected, as does division by a real. Note that division by a real effectivel performs","category":"page"},{"location":"","page":"Home","title":"Home","text":"A/x = (1/x) * A # Multivector A and real x\n````\nThis is optimal for most purposes, but take care if you are working in something other than Float64 precision (for example, using Float32 on the GPU). You may need some explicit type defintions to avoid Julia defaulting to Float64.\n\nThe library also builds on ```LinearAlgebra``` and overloads three functions from there:\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia tr(A)  # The scalar part of A dot(A,B)  # The scalar part of the product AB, usually written <AB>. A' = adjoint(A)  # The reverse of A. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"For this to work it is essential that you are ```using LinearAlgebra``` as well as ```using GeometricAlgebra```.\n\n`tr(A)` and `dot(A,B)` both return Reals, so take us out of whatever type is being employed for the arguments. These are key functions for extracting values at the end of geometric algebra calculation. Note that `tr(A*B)` and `dot(A,B)` return the same value, the scalar part of the geometric product `AB`. However, `dot(A,B)` contains optimisations to only calculate the relevant products and should be used in practice. \n\n\n### Projection\nProjection onto a single grade is performed with the project operator\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia project(A,n)  # Returns the grade n component of A.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This operation returns a multivector object. \n\n\n### Exponentiation\nAn exponential operator is included for Even multivectors. Two versions exist\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia exp(A)  # Exponentiates the full even multivector A. bivector_exp(A)  # Exponentiates the bivector part of A.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If the argument is a bivector both `exp(A)` and and `bivector_exp(A)` will written the same answer (to some precision). The reason for having a separate `bivector_exp(A)` command is that it can take advantage of various optimisations to ensure rotors are calculated as efficiently as possible. A separate command was thought to be more efficient than implementing a runtime check on the argumed of `exp(A)` to determine if the argument was a bivector.\n\n### Further Functions\n`inject` is a simple utility function for doting scalars into a basis set. The code is simple:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia inject(xs,ys) = reduce(+,map((x,y)->x*y,xs,ys))","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n## Outer and Inner products\nThis library does not provide explicit enstantiations of the inner and outer products. The main reason for this is that we treat the geometric product as the primary operation in the algebra. Inner and outer products simply project the results onto specific grades. So, for example, the outer product of 2 vectors is simply","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia project(a * b, 2)  # Returns the outer product of a and b.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Given this, there is little point introducing a new operator for the outer or inner product. We encourage users to find ways to express their calculations using combinations of geometric products, reverse and projection onto grade. This generally leads to efficient implementations.\n\nThis library is focused on a fast implementation of the geometric product. All the building blocks are in place to build an implementation of exterior algebra should that be desired, though other Julia packages do exist for this.\n\n\n## Namespaces\nOne advantage of how this library uses Julia's namespace and module structure is that it is straightforward to have multiple algbras in flight at one time. In a given application you may want to move elements between algebras, which can be achieved with the `dot` function mainly. There were too many cases to try and provide a single conversion function, and too many different ways of converting (projective split, conformal split ...). \n\nOne function that is provided is a universal `embed` function that lifts elements into the G(4,4) algebra. This is primarily for testing purposes, but might form the basis for writing more specific applications.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia embed(A)  # Takes a multivector from one of the smaller algebras and embeds it in G(4,4)","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n## Accuracy and display\n\nThe geometric product is associative and assumes that the number system it is built on is associative, commutative and distributive. Unfortunately Floating Point numbers cannot be guaranteed to satisfy these properties leading to small errors in computation. The effect of this is that some results that should algebraically be zero pick up a small non-zero component determined by machine precision. \n\nFor the small algebras these terms live inside matrix representations and there is litte point trying to filter them out. Instead we filter at the point of displaying results. A tolerance is set and all multivector components with magnitude less than this are not displayed. This turns out to be a decent compromise in practice.\n\nFor G(4,4) and larger algebras, where a different representation is used, it is more important to prevent these small terms from growing in code, so they are explicitly filtered out at the end of each computation.\n\n\n# The Core Algebras\n\n## G(2,0)\n* Name: `GA20`\n* Basis: `GA20.basis`\n* Basis vectors: `[GA20.e1, GA20.e2]`\n* Other basis elements: `GA20.I2 = e1 * e2`\n* Extra functions: `log, /, real, imag`\n\nG(2,0) is the algebra of the Euclidean plane. Even elements are stored as complex numbers. Odd elements (vectors) are mapped to even elements via","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia a -> e[1]*a  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nAs the even elements are complex numbers, some additional operations are permitted for these. As complex numbers are a division algebra, and the order is unambiguous we allow division for even elements in the this algebra.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia A/B  # Divides the even multivector A by B.  log(), real(), imag() # All act as expected. Note that imag returns a scalar, not a bivector.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n## G(3,0)\n* Name: `GA30`\n* Basis: `GA30.basis`\n* Basis vectors: `[GA30.e1, GA30.e2, GA30.e3]`\n* Other basis elements: `GA30.I3 = e1 * e2 * e3`\n\nG(3,0) is the algebra of Euclidean space, also called the Pauli algebra in quantum mechanics. Even elements form a quaternion algebra, which is how they are stored. Odd elements are mapped to even elements by the pseudoscalar,\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> I3 * M  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nQuaternions do form a division alegebra, but they are not commutative so the `/` operator is not extended. Division is equivalent to multiplication by the inverse, and the inverse is easily formed by taking a reverse, `M -> M'` and dividing by `M M'`. It is safer to implement this directly as the code is then quite clear on the order.\n\n## G(4,0)\n\n* Name: `GA40`\n* Basis: `GA40.basis`\n* Basis vectors: `[GA40.e1, GA40.e2, GA40.e3, GA40.e4]`\n* Other basis elements: `GA40.E4 = e1 * e2 * e3 *e4`\n\nG(4,0) is the geometric algebra for 4D Euclidean space, though in practice it is most often used as the algebra for 3D projective geometry. In a projective setup vectors represent points, bivectors represent lines etc, and duality it performed by multiplication by `E4`.\n\nThe even algebra is isomorphic to two seperate quaternion algebras, which is how the algebra is implemented. Multiplication in this algebra is fast (even faster than PGA). Odd elements are mapped to even elements by right multiplication by `e4`,","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> M * e4  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n## G(1,3), the STA\n* Name: `STA`\n* Basis: `STA.basis`\n* Basis vectors: `[STA.g0, STA.g1, STA.g2, STA.g3]`\n* Other basis elements:   \n    * `STA.s1 = g1 * g0`\n    * `STA.s2 = g2 * g0`\n    * `STA.s3 = g3 * g0`\n    * `STA.I4 = g0 * g1 * g2 * g3`\n* Extra functions: `bar(M) = g0 * M * g0 `\n\nThe algebra G(1,3) is the geometric algebra for Minkowski spacetime, better known as the Spacetime Algebra (STA). STA is the standard abbreviationn for this algebra so is used for the namespace.\n\nEven elements in the STA are isomorphic to 2X2 complex matrices (the full Pauli algebra), which is essentially how they are implemented here. (We acually unwrap the matrices and store the entries explicitly in a struct, which turns out to be slightly more efficient.)\n\nThe map between odd and even element is performed by right multiplication by `g0`.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> M * g0  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nOur implementation of the STA takes advantage of Julia's support for non-Ascii variables to pretty-type each `g` as a `γ`, and each `s` as a `σ`. This is in keeping with the conventions in the literature. But note that this is only a feature of the print command. In the code the elements are referred to as `g0`, `s1` etc. \n\nNote that the STA is also perfect for the conformal model of 2D Euclidean space, albeit with an overall sign flip in the signature. This is why currently there is no explicit algebra for G(3,1).\n\n## G(3,1) and 2D conformal geometry\n* Name: `GA31`\n* Basis: `GA31.basis`\n* Basis vectors: `[GA31.e1, GA31.e2, GA31.e3. GA31.f3]`\n* Other basis elements: `GA31.I4 = e1 * e2 * e3 * f3`\n\nThe algebra G(3,1) is the close relative of the STA, just with signatures flipped. Under the hood the implementation is almost identical, based on 2X2 complex matrices. Only a handful of signs are changed.\n\nThe main reason for including G(3,1) as a separate algebra is its use as the conformal algebra for the 2D plane. It is more convenient for 2D work to have an algebra where the 2D basis vectors have positive norm. As this is the main use case, we have not copied the STA convention of displaying the basis vectors with Greek letters. Instead we have adopted the standard convention of ```e1, e2, e3```s have positive square and ```f3``` having negative square.\n\n\n## G(3,0,1), the PGA\n* Name: `PGA`\n* Basis: `PGA.basis`\n* Basis vectors: `[PGA.e1, PGA.e2, PGA.e3. PGA.e0]`\n* Other basis elements: `PGA.I3 = e1 * e2 * e3`\n* Extra functions `pdual()`\n\nThe somewhat unfortunately named _PGA_ is the algebra for the 3D Euclidean group. The first three generators all square to +1, but the 4th generator is null.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia e0 * e0 = 0","category":"page"},{"location":"","page":"Home","title":"Home","text":"This arrangement ensures that rotors in the PGA generate Eucldiean motions, rotations and translations, which has obvious benefits for graphics. The name _PGA_ originated from the idea that the algebra was also the most appropriate for projective geometry, but that is not really the case. For pure _projective_ geometry it is best to work in G(4,0). For a projective treatment of Euclidean geometry, PGA is a good choice.\n\nNote that the PGA is a subalgebra of the CGA (see below), The CGA 'completes' the PGA, but at the expense of being a bigger algebra, so not as efficient. \n\nEven elements in the PGA are isomorphic to [dual quaternions](https://en.wikipedia.org/wiki/Dual_quaternion), which is how they are implemented. The map between odd and even elements is carried out using `I3`.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> I3 * M  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n### Duality\nThe fact that the pseudoscalar is null in PGA is a problem. Usually duality is implemented by multiplication by the pseudoscalar, which is very efficient. In PGA we need an operator that performs a similar function of mapping vectors to trivectors, etc. This is the function ```pdual()```. We follow the conventions of [De Keninck & Dorst](https://bivector.net/tools.html?p=3&q=0&r=1).","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia pdual(e0) = I3  # etc. Function for the PGA dual.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n## G(4,1), the CGA\n* Name: `CGA`\n* Basis: `CGA.basis`\n* Basis vectors: `[CGA.e1, CGA.e2, CGA.e3. CGA.e4, CGA.f4]`\n* Other basis elements: `CGA.I5 = e1 * e2 * e3 * e4 * f4`\n\nG(4,1) is the conformal algebra for 3D space, often called the conformal geometric algebra or CGA. This is the name used here, though note that any space with signature (p,q) has a conformal algebra G(p+1,q+1). The CGA contains the PGA as a subalgebra.\n\nWe explicitly use a basis of 4 positive norm vectors (`e1 ... e4`) and one negative norm (`f4`). The more familiar null basis elements are constructed from `e4` and `f4`. There are various conventions in use for this null basis, so rather than enforce one we leave it to the programmer to chose. These conventions spill over into the conformal representation of points as null vectors. The starting point for this is","category":"page"},{"location":"","page":"Home","title":"Home","text":"X = 2x + (1 - x^2) * e4 + (1 + x^2) * f4 = 2x + (f4+e4) + x^2(f4-e4)","category":"page"},{"location":"","page":"Home","title":"Home","text":"The two final vectors in the last term are null, and various conventions exist for labelling them, with differences in names, signs and factors of 2.\n\n\nThe even subalgebra of CGA is isomorphic to 2X2 matrices with quaternion entries, which is implemented by hard-coding the matrix product. This means that each product involves 8 quaternion products, compared to the 3 of PGA, and the 2 of G(4,0). So if speed is essential it is important to always be in the minimal algebra for a computation.\n\nThe map between odd and even is provided by the pseudoscalar. This will always be the case in odd-sized algebras.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> I5 * M # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n\n## G(3,3) and line geometry.\n* Name: `GA33`\n* Basis: `GA33.basis`\n* Basis vectors: `[GA33.e1, GA33.e2, GA33.e3. GA33.f1, GA33.f2, GA33.f3]`\n* Other basis elements: `GA33.E6 = f1 * e1 * f2 * e2 * f3 * e3`\n\nG(3,3) arises most naturally in the study of lines in three dimensions. In projective geometry lines are bivectors in G(4,0), so have 6 degrees of freedom, but they also satisfy a Plucker constraint which defines an inner product. This turns out to generate a space of signature (3,3), with null vectors representing lines. G(3,3) also arises in studying 2D conices.\n\nThe even subalgebra is isomorhic to a pair of 4X4 matrices, which are implemented using the [StaticArrays](https://juliaarrays.github.io/StaticArrays.jl/stable/) package. This has some performance benefits over LinearAlgebra. \n\nThe map between odd and even elements is provided by `e1`","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> M * e1  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n## G(2,4), conformal spacetime.\n* Name: `GA24`\n* Basis: `GA24.basis`\n* Basis vectors: `[GA24.g0, GA24.g1, GA24.g2. GA24.g3, GA24.g4, GA24.g5]`\n* Other basis elements: `GA24.I6 = g0 * g1 * g2 * g3 * g4 * g5`\n\nG(2,4) is the conformal algebra for spacetime, sometimes called the twistor algebra. As well as modelling flat Minkowski spacetime, it also contains de Sitter and anti de Sitter geometries. We follow the most common convention in the literature by having","category":"page"},{"location":"","page":"Home","title":"Home","text":"g0 * g0 = g5 * g5 = +1 g1 * g1 = g2 * g2 = g3 * g3 = g4 * g4 = -1","category":"page"},{"location":"","page":"Home","title":"Home","text":"This looks a bit clumsy, but has the merit of embedding the expected signature for STA generators. Labeling the additional positive signature vector as ```g5``` seemed the least worst option, but of course this is easily changed in your own code.\n\nThe even subalgebra of G(2,4) is isomorphic to 4X4 complex matrices (and the spinors in this space are Penrose's twistors). Again, the [StaticArrays](https://juliaarrays.github.io/StaticArrays.jl/stable/) package is used to form the basic representation.\n\nAs wth the STA, the map between even and odd algebras is provided by `g0`. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia M -> M * g0  # Map from odd to even.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n# The Large Algebras\n\nOnce we get to 8 dimensions the size of matrix required to represent elements get to 8X8, which is already quite inefficient. A different representation is required. (As an aside, the fact that 8 dimensions has an 8X8 matrix representation is the reason the octonion algebra exists, based on a map from spinors to vectors.)\n\nFor these large algebras we move to a representation where multivectors are stored as a list of basis blades and componets. The basis blades are stored as integers where the binary representation of the integer encodes the blade. One effect of this representation is that we no longer distinguish between even and odd elements as distinct.  All elements have the same type and can be combined.\n\nThis representation is considerably more compact than matrices, but has the downside that general products can be more expensive as we consider the product of every possible combination. Some work could be avoided by using an idempotent decomposition, but this is not implemented in the current code. For now this will have to be implemented on a case-by-case basis.\n\n## G(4,4)\n* Name: `GA44`\n* Basis: `GA44.basis`\n* Basis vectors: `[GA44.e1, GA44.e2, GA44.e3, GA44.e4, GA44.f1, GA44.f2, GA44.f3, GA44.f4]`\n* Extra functions `contruct44`\n\nBasis blades are labeled as `UInt8` and their product is encoded via some low-level binary functions. To claw back some performance we use the [SparseArrays](https://docs.julialang.org/en/v1/stdlib/SparseArrays/)  package to implement the sum. Multivectors are expanded into a 256-component vector, added, then sparsified back.\n\nA constructor is exposed, `construct44()` to put elements in the appropriate order, but in practice we recommend using the basis vectors to construct multivectors.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia construct44(T, bas::Vector{UInt8} , val::Vector{T})  # Construct a multivector with basis blades bs and values val.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Clearly to use this constructor you need to study the binary representation of blades.\n\n\n## G(32,32)\n* Name: `GA3232`\n* Basis: `GA3232.basis`\n* Extra functions `contruct3232`\n\nThe implementation is similar to GA(4,4), except now basis blades are represented as a `UInt64`. It is not feasible to use the sparse vector trick here, so addition requires some fiddly list manipulations. While the binary trick is fast, this algebra is never going to be highly performant.\n\nThe only way to access the generator vectors is via the basis. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia GA3232.basis[1] = e1 GA3232.basis[2] = f1 ... GA3232.basis[63] = e32 GA3232.basis[64] = e64 ```","category":"page"},{"location":"","page":"Home","title":"Home","text":"It is worth point out just how big G(32,32) actually is. This algebra contains 2^64 different basis elements. Just storing one element takes us into the exabyte regime! In practice working in this algebra probably means manipulating a few low-grade objects, typically just vectors and bivectors. For these the algebra will perform well.","category":"page"}]
}
